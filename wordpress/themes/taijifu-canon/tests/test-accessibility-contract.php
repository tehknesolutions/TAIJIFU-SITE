<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$failures = [];

foreach (['header.php', 'footer.php', 'assets/css/components.css', 'assets/js/navigation.js'] as $relative) {
    if (! is_file($root . '/' . $relative)) {
        $failures[] = "Missing accessible shell file: {$relative}";
    }
}

$header = is_file($root . '/header.php') ? (string) file_get_contents($root . '/header.php') : '';
$footer = is_file($root . '/footer.php') ? (string) file_get_contents($root . '/footer.php') : '';
$css = is_file($root . '/assets/css/components.css') ? (string) file_get_contents($root . '/assets/css/components.css') : '';
$js = is_file($root . '/assets/js/navigation.js') ? (string) file_get_contents($root . '/assets/js/navigation.js') : '';

foreach (['<header', '<nav', 'aria-expanded="false"', 'aria-controls="primary-menu"', '<main'] as $needle) {
    if (! str_contains($header, $needle)) {
        $failures[] = "Header missing accessibility contract: {$needle}";
    }
}
if (! str_contains($footer, '<footer')) {
    $failures[] = 'Footer landmark is missing.';
}
if (! str_contains($css, ':focus-visible')) {
    $failures[] = 'Component CSS must preserve visible focus.';
}
foreach (['aria-expanded', 'hidden'] as $needle) {
    if (! str_contains($js, $needle)) {
        $failures[] = "Navigation behavior missing state synchronization: {$needle}";
    }
}

if ($failures !== []) {
    fwrite(STDERR, implode(PHP_EOL, $failures) . PHP_EOL);
    exit(1);
}

fwrite(STDOUT, "TAIJIFU Canon accessibility shell contract: PASS" . PHP_EOL);
