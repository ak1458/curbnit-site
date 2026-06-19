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
    'endpoint' => 'https://openrouter.ai/api/v1/chat/completions',
    'model'    => 'openai/gpt-oss-120b:free',
    'key'      => 'YOUR_OPENROUTER_API_KEY_HERE',
  ],
];
