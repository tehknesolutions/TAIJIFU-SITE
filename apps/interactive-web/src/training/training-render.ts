import type { TrainingExperienceState } from './training-experience.js';

export function renderTrainingExperience(_state?: TrainingExperienceState): string {
  return `<section class="training-experience" data-training-root aria-labelledby="training-journey-title">
    <header class="training-experience__header">
      <p class="content-entry__type">TAI → JI → FU</p>
      <h2 id="training-journey-title">Compor a prática</h2>
      <p>O treino é composto em tempo de execução a partir do seu estado, das adaptações possíveis e do conhecimento canônico disponível.</p>
    </header>
    <ol class="training-stages" aria-label="Jornada de composição">
      <li data-training-stage="tai"><strong>TAI</strong><span>Estado</span></li>
      <li data-training-stage="ji"><strong>JI</strong><span>Adaptação</span></li>
      <li data-training-stage="fu"><strong>FU</strong><span>Manifestação</span></li>
    </ol>
    <form class="training-form" data-training-form>
      <fieldset>
        <legend>TAI / Estado</legend>
        <label>Objetivo principal <input name="primaryGoal" required autocomplete="off"></label>
        <label>Duração em minutos <input name="durationMinutes" type="number" min="1" value="30" required></label>
        <label>Intensidade percebida desejada <input name="desiredIntensity" type="range" min="1" max="10" value="5"></label>
      </fieldset>
      <section aria-labelledby="training-ji-title">
        <h3 id="training-ji-title">JI / Adaptação</h3>
        <p>O compositor verifica restrições e capacidades realmente disponíveis no CANON antes de selecionar qualquer prática.</p>
      </section>
      <section aria-labelledby="training-fu-title">
        <h3 id="training-fu-title">FU / Manifestação</h3>
        <p>Uma sessão concreta só é apresentada quando os dados oficiais sustentam a composição.</p>
      </section>
      <p class="training-status" data-training-status aria-live="polite">Preencha o estado TAI para iniciar a composição.</p>
      <button type="submit">Iniciar composição</button>
    </form>
  </section>`;
}
