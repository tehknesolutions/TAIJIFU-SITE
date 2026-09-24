<?php

defined( 'ABSPATH' ) || exit;

final class TJF_Content_Types {
    public static function register(): void {
        $types = [
            'tjf_principle' => [ 'Principles', 'Principle', 'principles' ],
            'tjf_path'      => [ 'Paths', 'Path', 'paths' ],
            'tjf_library'   => [ 'Library', 'Library Item', 'library' ],
            'tjf_lab'       => [ 'Lab', 'Lab Item', 'lab' ],
        ];

        foreach ( $types as $key => [ $plural, $singular, $slug ] ) {
            register_post_type( $key, [
                'labels' => [
                    'name'          => __( $plural, 'taijifu-core' ),
                    'singular_name' => __( $singular, 'taijifu-core' ),
                    'add_new_item'  => sprintf( __( 'Add New %s', 'taijifu-core' ), $singular ),
                    'edit_item'     => sprintf( __( 'Edit %s', 'taijifu-core' ), $singular ),
                ],
                'public'       => true,
                'show_in_rest' => true,
                'has_archive'  => true,
                'rewrite'      => [ 'slug' => $slug ],
                'supports'     => [ 'title', 'editor', 'excerpt', 'thumbnail', 'revisions' ],
                'menu_icon'    => 'dashicons-universal-access-alt',
            ] );
        }
    }
}
