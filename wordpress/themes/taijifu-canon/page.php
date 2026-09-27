<?php
declare(strict_types=1);
get_header();
?>
<section class="content-page" aria-labelledby="page-title">
  <?php while (have_posts()) : the_post(); ?>
    <header class="content-page__header">
      <h1 id="page-title"><?php the_title(); ?></h1>
    </header>
    <div class="content-page__body"><?php the_content(); ?></div>
  <?php endwhile; ?>
</section>
<?php get_footer(); ?>
