<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$required = ['page.php', 'single.php', 'archive.php', '404.php'];
$failures = [];

foreach ($required as $file) {
    if (! is_file($root . '/' . $file)) {
        $failures[] = "Missing canonical template: {$file}";
    }
}

$header = is_file($root . '/header.php') ? (string) file_get_contents($root . '/header.php') : '';
$index = is_file($root . '/index.php') ? (string) file_get_contents($root . '/index.php') : '';
if (substr_count($header, '<main') !== 1) $failures[] = 'Header must own the single main landmark.';
if (str_contains($index, '<main')) $failures[] = 'index.php must not create a nested main landmark.';

foreach ($required as $file) {
    $content = is_file($root . '/' . $file) ? (string) file_get_contents($root . '/' . $file) : '';
    if (! str_contains($content, 'get_header()') || ! str_contains($content, 'get_footer()')) {
        $failures[] = "{$file} must use the shared semantic shell.";
    }
}

if ($failures !== []) {
    fwrite(STDERR, implode(PHP_EOL, $failures) . PHP_EOL);
    exit(1);
}

fwrite(STDOUT, "TAIJIFU Canon template contract: PASS" . PHP_EOL);
