<?php

defined( 'ABSPATH' ) || exit;

final class TJF_Activation {
    public static function activate(): void {
        TJF_Content_Types::register();
        TJF_Taxonomies::register();
        flush_rewrite_rules();
    }
}
