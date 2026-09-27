<?php
declare(strict_types=1);

$root = dirname(__DIR__);
require_once $root . '/inc/theme-contract.php';
$failures = [];

foreach (['taijifu_canon_core_available', 'taijifu_canon_core_state'] as $function) {
    if (! function_exists($function)) {
        $failures[] = "Missing presentation boundary helper: {$function}()";
    }
}

if (function_exists('taijifu_canon_core_available') && ! is_bool(taijifu_canon_core_available())) {
    $failures[] = 'Core availability helper must return bool.';
}

if (function_exists('taijifu_canon_core_state')) {
    $state = taijifu_canon_core_state(false);
    if (! is_array($state) || ($state['available'] ?? null) !== false) {
        $failures[] = 'Explicit Core-absent state must be non-fatal and unavailable.';
    }
    if (($state['message'] ?? '') === '') {
        $failures[] = 'Core-absent state must expose an explicit presentation message.';
    }
    $present = taijifu_canon_core_state(true);
    if (($present['available'] ?? null) !== true) {
        $failures[] = 'Explicit Core-present state must report available.';
    }
}

$front = is_file($root . '/front-page.php') ? (string) file_get_contents($root . '/front-page.php') : '';
if (! str_contains($front, 'taijifu_canon_core_state')) {
    $failures[] = 'Front page must consume the presentation-safe Core state.';
}

foreach (['register_post_type(', 'register_taxonomy('] as $domainCall) {
    foreach (['functions.php', 'inc/theme-contract.php', 'front-page.php'] as $relative) {
        $path = $root . '/' . $relative;
        if (is_file($path) && str_contains((string) file_get_contents($path), $domainCall)) {
            $failures[] = "Theme must not own domain registration: {$domainCall} in {$relative}";
        }
    }
}

if ($failures !== []) {
    fwrite(STDERR, implode(PHP_EOL, $failures) . PHP_EOL);
    exit(1);
}

fwrite(STDOUT, "TAIJIFU Canon Core boundary contract: PASS" . PHP_EOL);
