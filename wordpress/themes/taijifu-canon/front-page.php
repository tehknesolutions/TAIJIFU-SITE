<?php
declare(strict_types=1);
get_header();
$themeUri = get_template_directory_uri();
?>
<section class="dojo-gate" aria-labelledby="dojo-title">
  <div class="dojo-gate__identity" aria-hidden="true">
    <img src="<?php echo esc_url($themeUri . '/assets/brand/omega1-master.svg'); ?>" alt="" width="280" height="280">
  </div>
  <div class="dojo-gate__copy">
    <p class="dojo-gate__eyebrow">Arte Marcial de se Adaptar</p>
    <h1 id="dojo-title">TAIJIFU</h1>
    <p class="dojo-gate__maxim">Firme na essência. Livre na forma.</p>
    <p class="dojo-gate__maxim">Mudar sem deixar de ser.</p>
    <div class="dojo-triad" aria-label="Princípios TAIJIFU">
      <article class="dojo-axis dojo-axis--tai"><h2>TAI</h2><p>Essência · Permanência · Axis</p></article>
      <article class="dojo-axis dojo-axis--ji"><h2>JI</h2><p>Discernimento · Adaptação · Nexus</p></article>
      <article class="dojo-axis dojo-axis--fu"><h2>FU</h2><p>Manifestação · Fluxo · Flow</p></article>
      <article class="dojo-axis dojo-axis--integration"><h2>Integração</h2><p>Axis · Nexus · Flow em relação.</p></article>
    </div>
    <a class="primary-cta" href="#taijifu-entry">Entrar no Dojo</a>
  </div>
</section>
<section id="taijifu-entry" class="dojo-entry" aria-labelledby="entry-title">
  <h2 id="entry-title">Comece pela essência</h2>
  <p>O caminho público apresenta TAI, JI e FU preservando a hierarquia semântica do CANON.</p>
</section>
<p class="site-authorship">Criado por Miguel Da Vinci e Thales Walisson — Desde 2026</p>
<?php get_footer(); ?>
