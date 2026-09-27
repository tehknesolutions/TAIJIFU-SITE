<?php
/**
 * Safe fallback template.
 */

declare(strict_types=1);

if (function_exists('get_header')) {
    get_header();
}
?>
<main id="main" class="site-main">
    <?php if (function_exists('have_posts')) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>">
                <h1><?php the_title(); ?></h1>
                <?php the_content(); ?>
            </article>
        <?php endwhile; ?>
    <?php endif; ?>
</main>
<?php
if (function_exists('get_footer')) {
    get_footer();
}
