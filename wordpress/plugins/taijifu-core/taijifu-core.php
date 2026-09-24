<?php
/**
 * Plugin Name: TAIJIFU Core
 * Description: Domain model and stable content interfaces for TAIJIFU.
 * Version: 1.0.0-alpha.1
 * Requires at least: 6.4
 * Requires PHP: 8.0
 * Text Domain: taijifu-core
 */

defined( 'ABSPATH' ) || exit;

define( 'TJF_CORE_VERSION', '1.0.0-alpha.1' );
define( 'TJF_CORE_FILE', __FILE__ );
define( 'TJF_CORE_DIR', plugin_dir_path( __FILE__ ) );

require_once TJF_CORE_DIR . 'includes/class-content-types.php';
require_once TJF_CORE_DIR . 'includes/class-taxonomies.php';
require_once TJF_CORE_DIR . 'includes/class-activation.php';

add_action( 'init', [ 'TJF_Content_Types', 'register' ] );
add_action( 'init', [ 'TJF_Taxonomies', 'register' ] );

register_activation_hook( TJF_CORE_FILE, [ 'TJF_Activation', 'activate' ] );
