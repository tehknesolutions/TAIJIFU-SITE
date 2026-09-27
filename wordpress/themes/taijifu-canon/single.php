<?php
declare(strict_types=1);
get_header();
?>
<section class="content-single" aria-labelledby="single-title">
  <?php while (have_posts()) : the_post(); ?>
    <article <?php post_class('content-entry'); ?>>
      <header class="content-entry__header">
        <p class="content-entry__type"><?php echo esc_html(get_post_type_object(get_post_type())->labels->singular_name ?? 'TAIJIFU'); ?></p>
        <h1 id="single-title"><?php the_title(); ?></h1>
        <?php if (has_excerpt()) : ?><p class="content-entry__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p><?php endif; ?>
      </header>
      <div class="content-entry__body"><?php the_content(); ?></div>
    </article>
  <?php endwhile; ?>
</section>
<?php get_footer(); ?>
