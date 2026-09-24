<?php

defined( 'ABSPATH' ) || exit;

final class TJF_Taxonomies {
    public static function register(): void {
        $objects = [ 'tjf_principle', 'tjf_path', 'tjf_library', 'tjf_lab' ];
        $taxonomies = [
            'tjf_axis'   => [ 'Axes', 'Axis', 'axis' ],
            'tjf_level'  => [ 'Levels', 'Level', 'level' ],
            'tjf_status' => [ 'Governance Statuses', 'Governance Status', 'governance-status' ],
        ];

        foreach ( $taxonomies as $key => [ $plural, $singular, $slug ] ) {
            register_taxonomy( $key, $objects, [
                'labels' => [
                    'name'          => __( $plural, 'taijifu-core' ),
                    'singular_name' => __( $singular, 'taijifu-core' ),
                ],
                'public'            => true,
                'show_in_rest'      => true,
                'show_admin_column' => true,
                'hierarchical'      => true,
                'rewrite'           => [ 'slug' => $slug ],
            ] );
        }
    }
}
