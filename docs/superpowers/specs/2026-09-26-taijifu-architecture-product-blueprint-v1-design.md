# TAIJIFU Architecture & Product Blueprint V1

Status: SPEC FOR CREATOR REVIEW
Date: 2026-09-26
Target: `tehknesolutions/TAIJIFU-SITE`
Authority: Current Creator-approved Discovery V2 and Chaos Trial

## 1. Intent

TAIJIFU is to evolve from its current public WordPress expression into one unified martial-arts ecosystem while preserving the existing site, canon, genealogy, manual, brand and prior platform work.

Within HNK, TAIJIFU is the conceptual equivalent of “artes marciais”. Outside HNK, TAIJIFU is positioned as a science of martial arts: a common center in which practitioners of different martial arts, styles, schools and lineages can meet without requiring those traditions to become identical.

The product is therefore not a single course, social network, dojo manager or game. It is a platform that can host all of those experiences over shared identity, martial knowledge, evidence, trust, events and governance.

Creator authority remains explicit: authorization to become a platform teacher and authorization to teach/charge through the governed TAIJIFU platform is controlled by Thales Wallison Santos Ferreira, Creator of TAIJIFU, until a later canonical governance decision explicitly changes that rule.

## 2. Product principles

TAIJIFU product creation follows the HNK composition:

- **Amor** — accessibility, care, consent, safety, human dignity and community value.
- **Magia** — meaning, symbolism, ritual, narrative and meaningful experience.
- **Tecnologia** — software capability, automation, interoperability and scale.
- **Ciência** — evidence, provenance, measurement, falsifiability where applicable and explicit uncertainty.
- **Arte** — visual identity, movement, composition, expression and craft.

These principles do not collapse distinct evidence classes. Symbolic/HNK interpretation, scientific evidence, martial tradition, human evaluation and AI inference remain distinguishable.

## 3. Governing architecture principle

### Planned Distribution → Progressive Manifestation

TAIJIFU SHALL design the complete target distributed architecture before physical distribution is required.

Logical boundaries, contracts, ownership, events, security boundaries, future microservices and microfrontends are planned in advance. Production starts with the smallest physical topology that preserves those boundaries.

Distribution delayed is not architecture delayed.

A bounded context becomes an independently deployed service only after an Extraction Gate review establishes sufficient operational reason, such as independent scaling, failure isolation, security boundary, specialized runtime, independent release cycle or independent team ownership.

## 4. Repository and genealogy

`tehknesolutions/TAIJIFU-SITE` is the target unified TAIJIFU repository.

Existing material remains genealogically significant:

- current TAIJIFU-SITE canon/site/WordPress/brand work;
- prior `Tehkne-Solutions/taijifu-platform` work;
- TAIJIFU manuals and curriculum sources;
- legacy repositories and historical experiments.

Current approved canon outranks historical implementation. Historical material is preserved and classified rather than silently rewritten into current truth.

WordPress remains a valid delivery surface during migration and SHALL remain independently deployable while the new platform is introduced. It is not required to become the runtime core of the future platform.

## 5. Product actors and identity

TAIJIFU uses one platform identity capable of operating in multiple contexts rather than separate accounts for every role.

Core actor/context classes include:

- practitioner/student;
- teacher/instructor;
- dojo owner/operator;
- organization/federation representative;
- researcher/contributor;
- competitor;
- parent/guardian;
- Junior user;
- moderator/reviewer;
- platform operator/governance authority.

### TUID

TAIJIFU owns a stable internal identity identifier (TUID). Authentication providers authenticate; they do not own domain identity.

Identity architecture includes an Identity Service, authentication adapters, Identity Graph, Family/Guardian relationships and Credential Wallet.

Capabilities and contextual authority are preferred over a flat global-role model.

## 6. Adaptive Martial OS

The primary authenticated experience is the **TAIJIFU Adaptive Martial OS**.

A user can switch contextual workspaces without changing account:

- Meu Dojo / personal martial life;
- Teacher;
- Dojo/organization operations;
- Research/Knowledge;
- Competition;
- Family/Junior.

Navigation, actions, widgets and information adapt according to:

`Identity + Capabilities + Context + Journey + Current Goals + Events`.

Junior experiences may expose a deliberately reduced, visual and gamified surface while using the same governed platform core.

## 7. Command Center

Administration is a separate application/surface, not merely the public frontend with additional buttons.

**TAIJIFU Command Center = Control Plane + Governance OS.**

It covers, subject to capabilities and audit:

- people and identity operations;
- teacher authorization;
- dojos and organizations;
- content and knowledge review;
- credentials and evidence;
- economy and payments operations;
- Trust & Safety;
- policies and governance decisions;
- service/event/job health;
- feature/configuration controls;
- analytics and graph views;
- AI/Coach operational visibility.

Critical actions require explicit capabilities, policy evaluation and audit records.

## 8. Domain/module catalog

The target logical platform includes the following bounded capabilities.

### Identity & Access
TUID, authentication adapters, profiles, capabilities, contextual authority, Family/Guardian, Credential Wallet.

### Martial Graph
Arts, styles, systems, lineages, techniques, organizations, ranks and martial relationships.

### Social & Community
Profiles, follows/relationships, feed, groups, forums, discussions and community interactions.

### Living Martial Knowledge
Canonical knowledge entities, sources, provenance, contributions, discussion, review and accepted learning material.

### Academy / Learning
Courses, lessons, learning paths, assessments, enrollment, certification flows and links to shared martial knowledge.

### Training
Goals, exercises, techniques, plans, sessions, load, frequency, results and training history. Training records reality independently from AI implementation.

### Coach
Personal Martial Intelligence that reasons over authorized profile, goals, context, history, evidence and martial knowledge to assist planning and adaptation.

### Evidence & Credentials
Evidence records, human evaluations, verification, credentials, expiry/revocation and provenance.

### Dojo Network
Organizations, units, instructors, practitioners, classes, schedules, attendance, graduations, events, operations and institutional graph relationships.

### Journey / RPG
Quests, skills, achievements, digital representation and world/game experiences.

Three progressions remain separate:

1. real martial progression/credentials;
2. TAIJIFU ecosystem progression;
3. RPG progression.

RPG level is never equivalent to martial rank.

### Economy
Payments, donations, subscriptions, courses, paid communities, advertising/sponsorship, Dojo SaaS, marketplace/revenue sharing where enabled and entitlements.

Three value domains remain distinct:

1. real money/financial ledger;
2. TAIJIFU reputation/contribution/value;
3. RPG economy.

Money does not directly purchase martial authority, verified reputation or official rank.

### Trust & Safety
Policies, consent, privacy, Junior protections, moderation, sanctions, appeals, contextual reputation and audit.

### Media & Martial Vision
Media ingestion, storage, transformation/streaming, metadata and optional multimodal/vision analysis.

Computer vision may observe, measure, classify or assist. It is not automatically an authorized martial judge.

### Intelligence Fabric
AI gateway/orchestration, specialized agents, RAG, tools, evaluations, speech/vision/model providers and AI observability.

Agents receive explicit domain tools/capabilities. They do not receive unrestricted database authority merely because they are AI agents.

### Search, Notifications & Communications
Cross-domain discovery, notifications, messaging/presence where enabled and user communication preferences.

### Governance
Creator/platform authority, policy decisions, teacher authorization, canonical governance, audit and decision history.

## 9. Shared knowledge model

TAIJIFU is a **Martial Social Knowledge Network**, not a collection of disconnected pages.

A martial entity such as a technique may connect to:

- definition/wiki material;
- sources;
- biomechanical information;
- style variations;
- media;
- lessons/courses;
- training exercises;
- discussions;
- teachers;
- evidence and credentials.

Knowledge provenance distinguishes at minimum concepts such as report/testimony, tradition, historical source, scientific evidence, interpretation, reviewed/accepted TAIJIFU knowledge and didactic material.

`Source ≠ Observation ≠ Interpretation ≠ Evidence ≠ Human Decision ≠ Verified Credential`.

## 10. Event Fabric and Activity Graph

Important domain changes produce versioned domain events through explicit contracts.

Initial reliable publication uses transactional state change + Outbox + Worker.

A broker such as NATS/JetStream is introduced when physical distribution creates a demonstrated operational need.

Events can feed projections such as Activity Graph, feed, analytics, notifications, Journey/RPG and search without making those projections authoritative domain state.

Private activity, especially Junior, Coach, training and sensitive personal information, does not become social activity automatically. Visibility and consent are domain rules.

## 11. Contract-first communication

The domain contract is authoritative; transport is a projection of the contract.

Supported target interfaces include:

- REST/OpenAPI for public/integration APIs;
- typed SDK/client for first-party experiences;
- asynchronous domain events;
- realtime subscriptions/presence where appropriate;
- gRPC or other service protocols only where justified.

Important contracts and event schemas are versioned and compatibility-tested.

## 12. Experience Platform

The frontend follows the same progressive distribution rule as the backend.

Initial web architecture uses a TAIJIFU Shell plus isolated Experience Modules. Each module owns its routes, UI composition, state boundary, permissions/capabilities, telemetry and domain client boundary.

Target experiences include:

- Web;
- Mobile;
- Command Center/Admin;
- future specialized/game surfaces.

Modules are microfrontend-ready but do not require independent deployment in V1. Physical microfrontend extraction requires evidence.

### Design System

The TAIJIFU Design System is more than components. It includes tokens, accessibility, typography, motion, interaction, layout and documented symbolic/HNK composition where canonically approved.

Current visual canon and brand assets remain inputs to this system rather than being discarded during platform migration.

## 13. Mobile Platform

Target mobile architecture is React Native + Expo + TypeScript initially, sharing contracts, SDKs, domain-safe models and design tokens rather than forcing full UI sharing with Web.

Native modules can be introduced for camera, sensors, wearables, computer vision or platform-specific capability. Kotlin/Swift implementations remain possible when justified.

## 14. Sovereign Hybrid Platform δ

The approved candidate architecture is:

**TypeScript-first + polyglot-ready + managed-infrastructure + sovereign-domain + progressive-distribution.**

Target technical direction:

- Web: React/Next.js family;
- Mobile: React Native/Expo;
- Admin: separate React/Next.js application;
- Core API: TypeScript, with NestJS/Fastify family as current target;
- authoritative relational state: PostgreSQL;
- initial managed infrastructure may provide Auth, Storage and Realtime behind TAIJIFU-owned ports/adapters;
- initial events: transactional Outbox + Worker;
- later broker: NATS/JetStream or equivalent after Extraction Gate;
- specialized services may use Python, Go, Rust, C#, Kotlin or another runtime when evidence justifies it.

Managed infrastructure is replaceable infrastructure. It does not own TAIJIFU domain semantics.

Frontend applications SHALL NOT spread core business rules through arbitrary direct database queries.

## 15. Initial physical topology

V1 production should remain intentionally compact while preserving target boundaries:

```text
Monorepo
├── apps/
│   ├── web
│   ├── mobile
│   ├── admin
│   └── api
├── services/
│   └── worker
├── packages/
│   ├── contracts
│   ├── domain
│   ├── events
│   ├── design-system
│   ├── sdk
│   └── hnk
└── platform/
    └── infrastructure
```

Initial runtime intent:

`1 API + 1 Worker + PostgreSQL + managed Auth/Storage/Realtime as selected + Web + Mobile + Admin`.

This topology is not permission to violate bounded-context ownership.

## 16. Extraction Gates

Every logical context can declare its future physical extraction plan.

An Architecture Review is triggered by evidence such as:

- independent scaling pressure;
- need for an independent failure domain;
- materially different security boundary;
- specialized runtime or infrastructure;
- independent release cadence;
- independent team ownership;
- demonstrated operational bottleneck.

Meeting a threshold triggers review, not automatic extraction.

## 17. Trust Fabric

Trust is contextual rather than one universal score.

A person may simultaneously have a verified martial credential, authorization to teach a specific scope, strong author reputation and no medical authority.

Trust Fabric spans Identity, Credentials, Evidence, Social, Dojo, Learning, Coach, Events and Economy.

Junior policies can constrain discovery, messaging, exposure, monetization and relationships differently from adult accounts.

AI output does not gain authority merely because a model generated it.

## 18. Martial Vision evidence boundary

Media may be linked to techniques, training, lessons, competitions and evidence.

The pipeline can support capture → consent/privacy → ingest → storage/transcode → metadata → optional vision analysis → evidence references.

Model inference remains distinguishable from human authorized evaluation and verified credential issuance.

## 19. Intelligence Fabric safety boundary

AI access occurs through governed tools/capabilities.

The system records enough provenance to distinguish:

- AI suggestion;
- deterministic rule;
- human decision;
- governance decision.

The HNK Symbolic Engine may contribute to meaning, narrative, organization, journeys, symbolic composition and experience. It must not silently replace scientific, medical, biomechanical, financial or credential evidence classes.

## 20. Engineering Fabric

TAIJIFU engineering follows an evidence-producing delivery chain:

`Issue/Intent → Branch → PR Gates → Build Artifact → Preview → Integration/E2E → Migration Gate → Release → Telemetry → Promote/Rollback → Learning`.

Planned quality gates include, as appropriate:

- formatting/lint;
- type checking;
- unit/domain tests;
- contract/schema compatibility tests;
- integration tests;
- E2E;
- architecture boundary tests;
- security checks;
- migration validation;
- performance checks;
- production smoke tests.

A successful deploy is not automatically a proven release.

Architecture tests SHOULD prevent forbidden cross-context internal dependencies.

## 21. Observability

Observability is designed around open instrumentation, with OpenTelemetry as the target standard unless later evidence changes that decision.

The platform defines conventions for:

- structured logs;
- metrics;
- traces;
- correlation/causation IDs;
- domain event observability;
- service health;
- SLOs/SLIs where maturity warrants them.

Observability vendors remain replaceable.

## 22. Resilience & Continuity Fabric

No critical truth may depend exclusively on a disposable projection, cache or external provider.

Data is classified by criticality:

- C0 — disposable/rebuildable;
- C1 — operational;
- C2 — important;
- C3 — critical;
- C4 — authority/audit/financial/credential.

Retention, backup, replication, audit and recovery policies vary by class.

The architecture supports, progressively:

- tested backups and restores;
- explicit RPO/RTO;
- idempotent consumers/commands where required;
- bounded retries;
- dead-letter/reconciliation handling;
- graceful degradation;
- circuit breaking where justified;
- event replay/reconciliation;
- compensating workflows;
- restore/failure drills.

Examples of required degradation behavior:

- AI outage must not erase or prevent authoritative training history from existing;
- RPG outage must not affect verified martial credentials;
- payment provider uncertainty remains pending/reconciling rather than fabricated as success;
- search/vector/feed projections can be rebuilt from authoritative sources.

## 23. Rebuildability

Caches, search indexes, vector indexes, graph read models, analytics projections and feeds are derived unless explicitly promoted by a later architecture decision.

Derived representations SHALL be reconstructable from authoritative state and durable event/provenance sources appropriate to their domain.

## 24. Monetization boundaries

Supported business directions include donations, course payments, paid communities, advertising/sponsorship, subscriptions, events, Dojo software/service revenue, marketplace transactions and other later-approved mechanisms.

Teacher monetization is subject to TAIJIFU teacher authorization and platform policy.

Financial truth uses an auditable financial ledger/model appropriate to the payment architecture. Entitlement is distinct from payment attempt.

## 25. WordPress transition

The current WordPress implementation remains useful as:

- public delivery surface during transition;
- existing content/canon presentation;
- fast experimentation surface where appropriate;
- historical implementation lineage.

The future platform SHALL NOT require WordPress to own cross-platform identity, event fabric, Coach, RPG, graph, trust or other core platform domains.

WordPress and the platform may coexist and exchange generated/static contracts or APIs while remaining independently bootable/deployable during migration.

## 26. Governance invariants

1. Current Creator-approved canon outranks conflicting historical implementation.
2. Teacher authorization and permission to teach/charge through the governed platform remain under the Creator authority defined in this spec until explicitly superseded.
3. Real martial credential, TAIJIFU ecosystem progression and RPG progression remain separate.
4. AI inference is not automatically human evaluation or credential authority.
5. HNK symbolic interpretation remains distinguishable from scientific/evidentiary claims.
6. Junior privacy/safety is architectural, not a later plugin.
7. Domain authority belongs to TAIJIFU contracts/models, not infrastructure vendors.
8. Logical distribution is planned before physical extraction.
9. Historical material is preserved with genealogy rather than silently rewritten.
10. Critical truth must survive loss of disposable projections.

## 27. Manifestation sequence

This Blueprint defines the target system, not a requirement to implement every module simultaneously.

The next planning artifacts SHALL decompose implementation into independently reviewable specifications/plans, beginning with foundations that reduce later rework.

High-level dependency order:

1. repository/canon/genealogy foundation;
2. monorepo and engineering foundation;
3. contracts + identity/TUID + capabilities;
4. core domain/event/outbox foundation;
5. Experience Shell + Design System;
6. Trust/Evidence foundations;
7. Martial/Knowledge foundations;
8. Learning/Training/Coach foundations;
9. Social/Community and Dojo Network;
10. Journey/RPG and Economy;
11. Media/Vision and advanced Intelligence;
12. progressive service/microfrontend extraction when gates justify it.

This ordering is a dependency model, not yet the sprint roadmap.

## 28. Acceptance criteria for this architecture

The architecture is correctly manifested when:

1. a new contributor can identify current canon, genealogy and experimental material without guessing;
2. one TUID can operate multiple authorized contexts/workspaces;
3. bounded contexts have explicit ownership and contracts even while sharing a process;
4. Web, Mobile and Admin consume governed contracts rather than duplicating domain truth;
5. WordPress can coexist without owning future platform domains;
6. event publication is reliable and versioned;
7. AI agents operate through explicit capabilities/tools;
8. Junior and sensitive-data rules are enforceable at domain boundaries;
9. financial, credential, ecosystem and RPG value remain distinguishable;
10. derived indexes/projections can be rebuilt;
11. architecture tests can detect prohibited coupling;
12. service extraction can occur through predefined boundaries instead of domain rediscovery;
13. releases produce observable evidence and can be rolled back/reconciled where applicable;
14. platform degradation does not silently corrupt authoritative state.

## 29. Explicit non-goals of V1 manifestation

This Blueprint does **not** require at first release:

- Kubernetes;
- dozens of independently deployed microservices;
- a physical graph database;
- Kafka/NATS before operational evidence requires a broker;
- independently deployed microfrontends;
- full computer-vision judging;
- every monetization mechanism;
- every RPG/world feature;
- replacement of all WordPress functionality on day one.

The architecture must permit these evolutions where justified without requiring them prematurely.

## 30. Decision summary

The architecture selected by Discovery V2 and Chaos Trial is:

> **TAIJIFU Sovereign Hybrid Platform δ**
>
> **Planned Distribution → Progressive Manifestation**

TAIJIFU is designed as a unified Martial Social Knowledge and Experience Platform with sovereign domain contracts, adaptive experiences, contextual trust, evidence-aware knowledge, progressive physical distribution and explicit separation between reality, inference, symbolism and game representation.

## 31. Next gate

This document is the written architecture/product design specification.

After Creator review and explicit approval, the next step is to produce the detailed implementation plan. That plan will decompose this Blueprint into PDD/GDD, ADRs, roadmap/milestones/epics and executable implementation slices without changing the approved architecture silently.
