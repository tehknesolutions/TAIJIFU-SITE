<?php
/**
 * Contract tests for TAIJIFU Core V1.
 * Run inside the WordPress PHPUnit test suite after loading the plugin.
 */

class Taijifu_Core_Content_Contract_Test extends WP_UnitTestCase {
    public function test_required_post_types_are_registered(): void {
        foreach ( [ 'tjf_principle', 'tjf_path', 'tjf_library', 'tjf_lab' ] as $post_type ) {
            $this->assertTrue( post_type_exists( $post_type ), "Missing post type: {$post_type}" );
        }
    }

    public function test_required_taxonomies_are_registered(): void {
        foreach ( [ 'tjf_axis', 'tjf_level', 'tjf_status' ] as $taxonomy ) {
            $this->assertTrue( taxonomy_exists( $taxonomy ), "Missing taxonomy: {$taxonomy}" );
        }
    }

    public function test_domain_content_is_not_deleted_on_deactivation_contract(): void {
        $post_id = self::factory()->post->create( [
            'post_type'   => 'tjf_principle',
            'post_title'  => 'Firme na essência. Livre na forma.',
            'post_status' => 'publish',
        ] );

        $this->assertGreaterThan( 0, $post_id );
        $this->assertSame( 'tjf_principle', get_post_type( $post_id ) );
        $this->assertFileDoesNotExist( dirname( __DIR__ ) . '/uninstall.php', 'V1 must not ship a destructive uninstall routine.' );
    }
}
