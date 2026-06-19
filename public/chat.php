<?php
/**
 * Curb'n IT — OPTIONAL AI chat proxy (keeps the API key OFF the browser).
 *
 * The site currently calls the AI provider directly from the browser (simple,
 * but the key ships in the JS bundle). When you're ready to hide the key:
 *
 *   1. Add an 'ai' block to config.php:
 *        'ai' => [
 *          'endpoint' => 'https://api.x.ai/v1/chat/completions',
 *          'model'    => 'grok-2-latest',
 *          'key'      => 'YOUR_REAL_KEY',
 *        ],
 *   2. In the website set NEXT_PUBLIC_AI_PROVIDER=proxy isn't needed — instead
 *      point NEXT_PUBLIC_GROK_ENDPOINT (or OPENROUTER) to "/chat.php" and leave
 *      the NEXT_PUBLIC_*_API_KEY blank. Rebuild + re-upload.
 *
 * The browser then talks only to this file; the key never leaves the server.
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

// Force our own model + cap tokens server-side (ignore client overrides).
$payload = [
  'model' => $ai['model'] ?? 'grok-2-latest',
  'messages' => $body['messages'],
  'max_tokens' => 160,
  'temperature' => 0.6,
];

$ch = curl_init($ai['endpoint']);
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_HTTPHEADER => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $ai['key'],
  ],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
]);
$res = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($res === false) {
  http_response_code(502);
  echo json_encode(['error' => 'upstream_failed']);
  exit;
}

http_response_code($httpCode ?: 200);
echo $res;
