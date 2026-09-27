<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$failures = [];
$assets = [
    'assets/brand/omega1-master.svg' => 'TAIJIFU Ω1 Official Master',
    'assets/brand/omega1-micro-master.svg' => 'TAIJIFU Ω1 Official Micro Master',
];

foreach ($assets as $relative => $identity) {
    $path = $root . '/' . $relative;
    if (! is_file($path)) {
        $failures[] = "Missing approved brand asset: {$relative}";
        continue;
    }
    $svg = (string) file_get_contents($path);
    if (! str_contains($svg, $identity)) {
        $failures[] = "Unexpected identity/provenance content in {$relative}";
    }
}

$readmePath = $root . '/README.md';
if (is_file($readmePath)) {
    $readme = (string) file_get_contents($readmePath);
    foreach (['brand/omega1/master/omega1-master.svg', 'brand/omega1/master/omega1-micro-master.svg'] as $source) {
        if (! str_contains($readme, $source)) {
            $failures[] = "README must document Ω1 provenance: {$source}";
        }
    }
    if (preg_match('/wordmark[^\n]*master/i', $readme) && ! str_contains($readme, 'not a master')) {
        $failures[] = 'Wordmark candidate must not be documented as master authority.';
    }
}

if ($failures !== []) {
    fwrite(STDERR, implode(PHP_EOL, $failures) . PHP_EOL);
    exit(1);
}

fwrite(STDOUT, "TAIJIFU Canon brand asset contract: PASS" . PHP_EOL);
