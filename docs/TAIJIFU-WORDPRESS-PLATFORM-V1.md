# TAIJIFU WordPress Platform V1 — CANON Product Architecture

Status: APPROVED DIRECTION / architecture source of truth
Date: 2026-09-24

## Product decision
**The WordPress site IS the TAIJIFU Platform.**

There is no separate public `site` and `platform` product. The single WordPress installation is simultaneously:
- the public TAIJIFU website;
- the authenticated practitioner Dojo;
- the LMS;
- the community;
- the blog/library;
- the Personalized Training experience;
- the administrative/content-governance surface.

The historical `taijifu-platform` repository is an input/source to audit and absorb. It must not become a second competing runtime.

## Product loop
The core experience is one continuous loop:

`Discover → Learn → Practice → Personalized Training → Execute → Feedback → Progress → Community → Learn again`

A single WordPress user identity owns the practitioner's profile, learning progress, training profile/history, community identity and achievements.

## Public surface
- Home / Dojo Gate CANON
- O TAIJIFU
- Princípios
- Caminho
- Blog
- Biblioteca
- HNK / genealogy where appropriate
- Entrar / Criar conta

## Authenticated surface — Meu Dojo
### Dashboard
Primary practitioner home after login:
- continue learning;
- Personalized Training primary CTA;
- current path/course progress;
- recent training history;
- next recommended learning/practice action;
- community activity relevant to the practitioner;
- achievements/progress summary.

### Personalized Training — flagship
The Personalized Training Engine is a first-class product, not a side page.

Flow:
`Adaptive interview/profile → constraints/preferences → runtime composition → session → execution → feedback → history → next adaptation`

It integrates with LMS state. Learned/validated techniques can become evidence for candidate selection; when a useful technique is not yet learned, the product can point to the corresponding lesson rather than silently pretending mastery.

The dynamic composition invariants from `TAIJIFU-PERSONALIZED-TRAINING-ENGINE-V1.md` remain binding.

### LMS
WordPress-native TAIJIFU learning domain:
- Courses / Caminhos
- Modules
- Lessons
- Practices / challenges
- Assessments/checkpoints
- Enrollments
- Lesson/course completion
- Progress
- prerequisites where required
- certificates/achievements when canonical rules are defined

Manual and approved CANON content are source material for the LMS after provenance/classification; historical definitions are not silently promoted to current teaching.

### Community
Integrated with the same WordPress identity:
- practitioner profile;
- activity/feed;
- posts;
- comments/replies;
- groups / Dojos;
- course/lesson discussions;
- achievements/activity where privacy permits;
- moderation/reporting.

Community is connected to learning and practice, but private training/profile data is never exposed automatically.

### Blog / Library
Blog:
- public/editorial articles;
- announcements;
- learning/training articles.

Library:
- structured validated resources;
- forms/media/reference materials;
- explicit CANON/METHOD/LIBRARY/LAB governance where applicable.

## WordPress administration
The WP admin remains the unified operational back office:
- CANON/governance;
- Courses/Modules/Lessons;
- exercise catalog/training engine data;
- Blog/Library;
- Community moderation;
- users/roles;
- progress/reporting;
- platform configuration.

## Plugin/theme boundary
### `taijifu-core`
Becomes the **TAIJIFU Platform domain engine** and owns:
- canonical content/domain contracts;
- LMS content/progress/enrollment domain;
- Personalized Training Engine;
- practitioner profile/progress/achievement domain;
- community domain extensions/integration contract;
- secure REST/AJAX application interfaces;
- roles/capabilities;
- provenance/import contracts for Manual and historical Platform sources.

### `taijifu-canon`
Owns presentation only:
- public CANON visual system / Dojo Gate;
- authenticated Meu Dojo application shell;
- LMS screens;
- community screens;
- Blog/Library screens;
- Personalized Training UI;
- responsive/accessibility/motion behavior.

Business rules must not live in the theme.

## Data architecture V1
Prefer WordPress-native primitives unless measurement proves they are insufficient:
- users/user meta for identity and bounded profile preferences;
- custom post types/taxonomies for authored learning/library/community-compatible content;
- dedicated plugin tables are permitted for high-volume relational/event data such as progress/session history only when justified by query/retention requirements;
- WordPress REST API for authenticated application interactions;
- stable IDs/provenance metadata for imported/normalized source content.

No destructive uninstall behavior in V1.

## Identity and roles
Initial roles/capabilities model:
- Visitor — public content only;
- Practitioner — own learning/training/community experience;
- Instructor — permitted learning/training content workflows;
- Moderator — community moderation;
- Canon Editor — governance-authorized canonical content workflow;
- Administrator — WordPress/platform administration.

Capabilities, not role-name checks, govern privileged actions.

## Integration with historical `taijifu-platform`
The repository is audited feature-by-feature and classified:
- **ABSORB** — useful capability/content becomes WordPress-native;
- **ADAPT** — useful concept requires current CANON/domain adaptation;
- **REFERENCE** — implementation knowledge retained but not runtime code;
- **LEGACY** — superseded behavior preserved genealogically;
- **REJECT** — not compatible/useful.

There will be no second production application merely to preserve old architecture.

## Content completeness audit
Before declaring the LMS/content complete, create a coverage matrix across:
- current CANON;
- Manual V12;
- historical Platform;
- current WordPress content.

At minimum audit:
- philosophy/principles;
- TAI/JI/FU;
- Caminho/levels;
- courses/modules/lessons;
- techniques/exercises;
- assessments/practices;
- progression/XP/certification;
- Blog/Library/reference content;
- training metadata sufficient for personalization;
- community concepts/features;
- assets/media;
- provenance/governance status.

Every item receives `PRESENT`, `PARTIAL`, `MISSING`, `LEGACY`, `CONFLICT` or `OPEN` plus source/provenance.

## Navigation target
Public navigation remains focused. Authenticated navigation becomes application-oriented:
- Meu Dojo
- Treino Personalizado
- Aprender
- Comunidade
- Biblioteca
- Perfil

Do not overload the public Dojo Gate with every application destination.

## Safety/privacy
- private learning/training history is private by default;
- community sharing requires explicit user action;
- exercise constraints are not public profile badges;
- secure ownership/capability checks on all personalized/progress endpoints;
- moderation/reporting controls for community;
- data minimization and WordPress privacy export/erase compatibility;
- training remains non-diagnostic and fails safely when compatibility metadata is insufficient.

## Acceptance gates
1. One WordPress installation provides both public site and authenticated platform.
2. No user must authenticate separately for LMS, Community or Personalized Training.
3. Personalized Training is functional and prominently reachable from Meu Dojo.
4. LMS progress can inform training personalization through explicit domain interfaces.
5. Community uses the same practitioner identity without exposing private training data by default.
6. Manual/Platform content is audited before being presented as current CANON teaching.
7. Theme contains presentation; Core contains domain/business rules.
8. Plugin deactivation does not delete user/content/progress data.
9. Public Dojo Gate retains the approved CANON visual direction.
10. The historical Platform is absorbed/audited rather than deployed as a competing application.

## Definition of V1
TAIJIFU Platform V1 exists when a user can enter through the CANON WordPress site, create/login to one account, reach Meu Dojo, learn through the LMS, generate and execute a genuinely personalized workout, record progress/feedback, participate in the community, access Blog/Library content, and return to a unified dashboard — all inside the same WordPress product.