<?php
declare(strict_types=1);
get_header();
?>
<section class="content-page content-page--not-found" aria-labelledby="not-found-title">
  <h1 id="not-found-title">Caminho não encontrado</h1>
  <p>A apresentação CANON permanece disponível. Retorne ao Dojo Gate para continuar.</p>
  <a class="primary-cta" href="<?php echo esc_url(home_url('/')); ?>">Voltar ao início</a>
</section>
<?php get_footer(); ?>
