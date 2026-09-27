<?php
/**
 * TAIJIFU Canon theme bootstrap.
 */

declare(strict_types=1);

require_once __DIR__ . '/inc/theme-contract.php';
require_once __DIR__ . '/inc/assets.php';

if (function_exists('add_action')) {
    add_action('after_setup_theme', static function (): void {
        if (function_exists('add_theme_support')) {
            add_theme_support('title-tag');
            add_theme_support('post-thumbnails');
            add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
        }
        if (function_exists('register_nav_menus')) {
            register_nav_menus([
                'primary' => 'Navegação principal',
            ]);
        }
    });
    add_action('wp_enqueue_scripts', 'taijifu_canon_enqueue_assets');
}
