<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$path = $root . '/assets/css/tokens.css';
$failures = [];

if (! is_file($path)) {
    $failures[] = 'Missing assets/css/tokens.css';
} else {
    $css = (string) file_get_contents($path);
    foreach (['--color-paper', '--color-charcoal', '--color-tai', '--color-ji', '--color-fu', '--color-integration', '--space-page-gutter'] as $token) {
        if (! str_contains($css, $token)) {
            $failures[] = "Missing CANON token: {$token}";
        }
    }
    if (! preg_match('/--space-page-gutter\s*:\s*(?:2[4-9]|[3-9][0-9])px\b/', $css)) {
        $failures[] = 'Mobile page gutter must be at least 24px.';
    }
}

$cssFiles = glob($root . '/assets/css/*.css') ?: [];
foreach ($cssFiles as $cssFile) {
    $css = strtolower((string) file_get_contents($cssFile));
    foreach (['linear-gradient(', 'radial-gradient(', 'backdrop-filter:', 'text-shadow:'] as $banned) {
        if (str_contains($css, $banned)) {
            $failures[] = basename($cssFile) . " contains banned visual construct: {$banned}";
        }
    }
}

if ($failures !== []) {
    fwrite(STDERR, implode(PHP_EOL, $failures) . PHP_EOL);
    exit(1);
}

fwrite(STDOUT, "TAIJIFU Canon token contract: PASS" . PHP_EOL);
