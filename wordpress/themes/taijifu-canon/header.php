<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main">Pular para o conteúdo</a>
<header class="site-header">
  <a class="site-brand" href="<?php echo esc_url(home_url('/')); ?>" aria-label="TAIJIFU — início">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/brand/omega1-master.svg'); ?>" alt="" width="48" height="48">
    <span>TAIJIFU</span>
  </a>
  <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-menu">Menu</button>
  <nav class="primary-nav" aria-label="Navegação principal">
    <?php
    wp_nav_menu([
        'theme_location' => 'primary',
        'container' => false,
        'menu_id' => 'primary-menu',
        'menu_class' => 'primary-menu',
        'fallback_cb' => false,
    ]);
    ?>
  </nav>
</header>
<main id="main" class="site-main">
