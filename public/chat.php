<?php
/**
 * Curb'n IT — AI chat proxy (keeps the API key OFF the browser).
 *
 * Reads the endpoint/model/key from config.php and forwards the chat
 * request server-side, so the key never reaches the JS bundle. Adds two
 * things on top of a plain proxy:
 *
 *   - Model fallback: tries `model` first (light + fast); if that call
 *     fails or comes back empty, retries once with `model_fallback`.
 *   - Per-IP rate limit: caps requests per IP within a time window so a
 *     single visitor can't burn through the free provider quota.
 *
 * See AI-INTEGRATION.md.
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'method_not_allowed']);
  exit;
}

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
  http_response_code(500);
  echo json_encode(['error' => 'not_configured']);
  exit;
}
$config = require $configPath;
$ai = $config['ai'] ?? null;
if (!$ai || empty($ai['key'])) {
  http_response_code(500);
  echo json_encode(['error' => 'ai_not_configured']);
  exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body) || empty($body['messages'])) {
  http_response_code(422);
  echo json_encode(['error' => 'bad_request']);
  exit;
}

/** Per-IP request cap. File-based (no DB needed on shared hosting). */
function chatRateLimit(array $limit): array {
  $max = $limit['max'] ?? 20;
  $window = $limit['window'] ?? 3600;
  $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

  $dir = sys_get_temp_dir() . '/curbnit_chat_rl';
  if (!is_dir($dir)) @mkdir($dir, 0700, true);
  $file = $dir . '/' . md5($ip) . '.json';

  $fp = @fopen($file, 'c+');
  if (!$fp) return ['allowed' => true]; // fail-open if we can't touch the disk

  flock($fp, LOCK_EX);
  $raw = stream_get_contents($fp);
  $data = $raw ? json_decode($raw, true) : null;
  $now = time();
  if (!is_array($data) || ($now - ($data['windowStart'] ?? 0)) >= $window) {
    $data = ['windowStart' => $now, 'count' => 0];
  }
  $data['count']++;
  $allowed = $data['count'] <= $max;

  ftruncate($fp, 0);
  rewind($fp);
  fwrite($fp, json_encode($data));
  fflush($fp);
  flock($fp, LOCK_UN);
  fclose($fp);

  return ['allowed' => $allowed];
}

$rateLimit = $ai['rate_limit'] ?? ['max' => 20, 'window' => 3600];
if (!chatRateLimit($rateLimit)['allowed']) {
  http_response_code(429);
  echo json_encode(['error' => 'rate_limited']);
  exit;
}

/** Calls one model. Returns the raw upstream body only on a usable reply. */
function chatCallModel(string $endpoint, string $key, string $model, array $messages): array {
  $payload = [
    'model' => $model,
    'messages' => $messages,
    'max_tokens' => 160,
    'temperature' => 0.6,
  ];

  $ch = curl_init($endpoint);
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
      'Content-Type: application/json',
      'Authorization: Bearer ' . $key,
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
  ]);
  $res = curl_exec($ch);
  $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if ($res === false) {
    return ['ok' => false, 'code' => 0, 'body' => null];
  }
  $decoded = json_decode($res, true);
  $hasReply = !empty($decoded['choices'][0]['message']['content']);
  $ok = $httpCode >= 200 && $httpCode < 300 && $hasReply;

  return ['ok' => $ok, 'code' => $httpCode, 'body' => $res];
}

$primaryModel = $ai['model'] ?? 'qwen/qwen3.8-27b';
$fallbackModel = $ai['model_fallback'] ?? 'openai/gpt-oss-20b';

$result = chatCallModel($ai['endpoint'], $ai['key'], $primaryModel, $body['messages']);

if (!$result['ok'] && $fallbackModel) {
  $result = chatCallModel($ai['endpoint'], $ai['key'], $fallbackModel, $body['messages']);
}

if ($result['body'] === null) {
  http_response_code(502);
  echo json_encode(['error' => 'upstream_failed']);
  exit;
}

http_response_code($result['code'] ?: 200);
echo $result['body'];
