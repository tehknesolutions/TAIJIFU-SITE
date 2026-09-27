<?php
declare(strict_types=1);

$root = dirname(__DIR__);
$path = $root . '/front-page.php';
$failures = [];

if (! is_file($path)) {
    $failures[] = 'Missing front-page.php Dojo Gate.';
} else {
    $html = (string) file_get_contents($path);
    if (substr_count(strtolower($html), '<h1') !== 1) {
        $failures[] = 'Dojo Gate must contain exactly one H1.';
    }
    foreach (['omega1-master.svg', 'TAI', 'JI', 'FU', 'Integração', 'Arte Marcial de se Adaptar', 'Firme na essência. Livre na forma.', 'Mudar sem deixar de ser.', 'Miguel Da Vinci', 'Thales Walisson', '2026'] as $needle) {
        if (! str_contains($html, $needle)) {
            $failures[] = "Dojo Gate missing CANON content: {$needle}";
        }
    }
    if (! preg_match('/<a[^>]+class="[^"]*primary-cta[^"]*"/i', $html)) {
        $failures[] = 'Dojo Gate must expose a reachable primary CTA link.';
    }
}

if ($failures !== []) {
    fwrite(STDERR, implode(PHP_EOL, $failures) . PHP_EOL);
    exit(1);
}

fwrite(STDOUT, "TAIJIFU Canon Dojo Gate contract: PASS" . PHP_EOL);
