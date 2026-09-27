<?php
/**
 * TAIJIFU Canon theme scaffold contract.
 *
 * This test intentionally lands before the production theme scaffold so the
 * RED state is represented in repository history.
 */

declare(strict_types=1);

$themeRoot = dirname(__DIR__);

$requiredFiles = [
    'style.css',
    'functions.php',
    'index.php',
    'inc/theme-contract.php',
    'README.md',
];

$failures = [];

foreach ($requiredFiles as $file) {
    if (! is_file($themeRoot . '/' . $file)) {
        $failures[] = "Missing required theme file: {$file}";
    }
}

$stylePath = $themeRoot . '/style.css';
if (is_file($stylePath)) {
    $style = (string) file_get_contents($stylePath);
    if (! str_contains($style, 'Theme Name: TAIJIFU Canon')) {
        $failures[] = 'style.css must declare Theme Name: TAIJIFU Canon';
    }
}

$functionsPath = $themeRoot . '/functions.php';
if (is_file($functionsPath)) {
    $functions = (string) file_get_contents($functionsPath);
    if (! str_contains($functions, 'inc/theme-contract.php')) {
        $failures[] = 'functions.php must load inc/theme-contract.php';
    }
}

if ($failures !== []) {
    fwrite(STDERR, implode(PHP_EOL, $failures) . PHP_EOL);
    exit(1);
}

require_once $themeRoot . '/inc/theme-contract.php';

if (! function_exists('taijifu_canon_core_available')) {
    fwrite(STDERR, "Missing taijifu_canon_core_available() contract helper." . PHP_EOL);
    exit(1);
}

if (! is_bool(taijifu_canon_core_available())) {
    fwrite(STDERR, "taijifu_canon_core_available() must return bool." . PHP_EOL);
    exit(1);
}

fwrite(STDOUT, "TAIJIFU Canon theme scaffold contract: PASS" . PHP_EOL);
