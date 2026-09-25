<?php
$_tests_dir = getenv( 'WP_TESTS_DIR' ) ?: '/tmp/wordpress-tests-lib';
if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
    fwrite( STDERR, "WordPress test suite not found.\n" );
    exit( 1 );
}
require_once $_tests_dir . '/includes/functions.php';

tests_add_filter( 'muplugins_loaded', static function (): void {
    require dirname( __DIR__ ) . '/taijifu-core.php';
} );

require $_tests_dir . '/includes/bootstrap.php';
