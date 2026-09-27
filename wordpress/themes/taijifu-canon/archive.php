<?php
declare(strict_types=1);
get_header();
?>
<section class="content-archive" aria-labelledby="archive-title">
  <header class="content-archive__header">
    <p class="content-entry__type">TAIJIFU</p>
    <h1 id="archive-title"><?php the_archive_title(); ?></h1>
    <?php the_archive_description('<div class="content-archive__description">', '</div>'); ?>
  </header>
  <div class="content-archive__list">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
      <article <?php post_class('content-card'); ?>>
        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
        <div><?php the_excerpt(); ?></div>
      </article>
    <?php endwhile; else : ?>
      <p>Nenhum conteúdo encontrado neste caminho.</p>
    <?php endif; ?>
  </div>
</section>
<?php get_footer(); ?>
