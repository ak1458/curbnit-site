<?php
/**
 * Curb'n IT — server config TEMPLATE.
 *
 * SETUP:
 *   1. Copy this file to "config.php" in the same folder on Hostinger.
 *   2. Paste the real AI API key below.
 *   3. config.php is git-ignored and blocked from the web by .htaccess, so the
 *      key never reaches the browser or the repo — only this example is committed.
 *
 * The contact form uses Web3Forms (client-side), so no SMTP config is needed.
 */

return [
  // AI chat proxy — used by chat.php. The browser talks only to /chat.php.
  'ai' => [
    'endpoint'       => 'https://api.groq.com/openai/v1/chat/completions',
    // Fast & reliable Oregon curb assistant model.
    'model'          => 'qwen/qwen3.8-27b',
    // Only used if the primary model call fails (bad response, timeout, etc).
    'model_fallback' => 'openai/gpt-oss-20b',
    'key'            => 'YOUR_GROQ_API_KEY_HERE',
    // Per-IP cap so nobody can burn through the free Groq quota.
    'rate_limit'     => ['max' => 60, 'window' => 3600],
  ],
];
