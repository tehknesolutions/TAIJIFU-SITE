<?php
/**
 * Safe fallback template.
 */

declare(strict_types=1);

get_header();
?>
<section class="content-page" aria-labelledby="fallback-title">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" class="content-entry">
                <h1 id="fallback-title"><?php the_title(); ?></h1>
                <?php the_content(); ?>
            </article>
        <?php endwhile; ?>
    <?php else : ?>
        <h1 id="fallback-title">TAIJIFU</h1>
        <p>Nenhum conteúdo disponível neste caminho.</p>
    <?php endif; ?>
</section>
<?php get_footer(); ?>
