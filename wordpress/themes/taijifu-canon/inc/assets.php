<?php
declare(strict_types=1);

if (! function_exists('taijifu_canon_enqueue_assets')) {
    function taijifu_canon_enqueue_assets(): void
    {
        if (! function_exists('wp_enqueue_style') || ! function_exists('get_template_directory_uri')) {
            return;
        }

        $uri = get_template_directory_uri();
        $version = wp_get_theme()->get('Version');
        wp_enqueue_style('taijifu-canon-tokens', $uri . '/assets/css/tokens.css', [], $version);
        wp_enqueue_style('taijifu-canon-base', $uri . '/assets/css/base.css', ['taijifu-canon-tokens'], $version);
    }
}
