# TAIJIFU Platform Foundation V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the first executable monorepo foundation for the approved TAIJIFU Sovereign Hybrid Platform δ without breaking or subordinating the existing WordPress delivery surface, canon, brand, genealogy, or PHP contract suite.

**Architecture:** Add a TypeScript/pnpm/Turborepo platform workspace beside the existing WordPress tree. V1 manifests the approved compact topology as bootable shells (`web`, `admin`, `api`, `worker`) plus shared contracts/domain/events/SDK/HNK/design-system packages, while architectural boundary tests and CI prevent accidental coupling. Mobile is represented by a workspace boundary/contract in this foundation plan but its Expo runtime is deferred to the dedicated Mobile plan so this slice remains independently testable and does not inflate the first production foundation.

**Tech Stack:** Node.js 22 LTS; pnpm 10; Turborepo; TypeScript 5.x strict mode; Vitest; ESLint; dependency-cruiser; Next.js 15 family for Web/Admin shells; NestJS 11 + Fastify for API shell; existing PHP 8.2/PHPUnit 9.6 WordPress contract suite remains intact.

**Spec:** `docs/superpowers/specs/2026-09-26-taijifu-architecture-product-blueprint-v1-design.md`

## Global Constraints

- Architecture: **TAIJIFU Sovereign Hybrid Platform δ**.
- Governing principle: **Planned Distribution → Progressive Manifestation**.
- `tehknesolutions/TAIJIFU-SITE` remains the unified repository.
- Existing WordPress remains independently bootable/deployable during migration.
- Current Creator-approved canon outranks conflicting historical implementation.
- Domain authority belongs to TAIJIFU contracts/models, not infrastructure vendors.
- Frontends must not spread core business rules through arbitrary direct database queries.
- Initial event direction is transactional Outbox + Worker; no NATS/Kafka in Foundation V1.
- No Kubernetes, physical graph database, independently deployed microfrontends, or mass microservice extraction in Foundation V1.
- Web, Admin and future Mobile consume governed contracts/SDK boundaries.
- TypeScript uses strict mode and package exports; no deep imports into another bounded package's `src/` internals.
- Existing `.github/workflows/taijifu-core-contracts.yml` remains valid and its PHP/WordPress contract job continues to pass.
- No existing `wordpress/`, `brand/`, `docs/`, `bin/` or canonical content is moved or deleted by this plan.

## Review Focus

1. **Legacy coexistence:** adding Node workspace files must not alter WordPress paths or break the existing PHP contract workflow; Task 2 adds a legacy-preservation test and Task 8 keeps the PHP job in CI.
2. **Forbidden coupling:** an app/package deep-importing another package's internals must fail architecture validation; Task 5 pins this with dependency-cruiser fixtures/tests.
3. **Provider leakage:** app code importing Supabase/provider SDKs directly must fail architecture validation; Task 5 owns this rule.
4. **Contract drift:** an invalid or incompatible event envelope must fail contract tests before apps consume it; Task 4 owns schema/version tests.
5. **Bootability:** Web, Admin, API and Worker must each build/start from the root workspace without depending on WordPress runtime; Tasks 6–8 verify build/smoke behavior.

---

## Target File Structure

```text
TAIJIFU-SITE/
├── apps/
│   ├── web/                  # public/authenticated web shell
│   ├── admin/                # Command Center shell
│   └── api/                  # NestJS/Fastify platform API shell
├── services/
│   └── worker/               # async/outbox worker shell
├── packages/
│   ├── contracts/            # transport-neutral public contracts
│   ├── domain/               # domain primitives only
│   ├── events/               # domain event envelope/catalog primitives
│   ├── sdk/                  # first-party typed client boundary
│   ├── design-system/        # shared tokens/primitives boundary
│   └── hnk/                  # HNK/symbolic integration boundary, no evidence substitution
├── platform/
│   └── infrastructure/       # provider adapters/config boundary
├── tests/
│   └── architecture/         # repository/architecture invariants
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
├── eslint.config.mjs
├── vitest.workspace.ts
└── .dependency-cruiser.cjs
```

The existing `wordpress/`, `brand/`, `docs/`, `bin/` and `.github/` trees remain in place.

---

### Task 1: Root Workspace Contract

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `tsconfig.base.json`
- Create: `eslint.config.mjs`
- Create: `vitest.workspace.ts`
- Create: `.nvmrc`
- Create: `.npmrc`

**Interfaces:**
- Consumes: existing repository root without relocating legacy files.
- Produces: root commands `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm architecture:test`; workspace globs `apps/*`, `services/*`, `packages/*`, `platform/*`.

- [ ] **Step 1: Add a failing workspace-manifest check**

Create `tests/architecture/workspace-manifest.test.ts` asserting that the workspace manifest contains exactly the four approved workspace roots and that root scripts expose `lint`, `typecheck`, `test`, `build`, and `architecture:test`.

- [ ] **Step 2: Run the test and confirm it fails because the Node workspace does not yet exist**

Run: `corepack enable && pnpm exec vitest run tests/architecture/workspace-manifest.test.ts`
Expected: FAIL because `package.json`/`pnpm-workspace.yaml` are absent or incomplete.

- [ ] **Step 3: Create the root workspace configuration**

Use Node `22`, pnpm `10`, private root package, Turborepo pipelines for `lint`, `typecheck`, `test`, and `build`, TypeScript strict mode, and workspace globs exactly as defined above.

- [ ] **Step 4: Install and verify the manifest test**

Run: `corepack enable && pnpm install && pnpm exec vitest run tests/architecture/workspace-manifest.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-workspace.yaml turbo.json tsconfig.base.json eslint.config.mjs vitest.workspace.ts .nvmrc .npmrc tests/architecture/workspace-manifest.test.ts pnpm-lock.yaml
git commit -m "build(platform): establish TAIJIFU workspace contract"
```

### Task 2: Legacy Coexistence Guard

**Files:**
- Create: `tests/architecture/legacy-coexistence.test.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: existing `wordpress/`, `brand/`, `docs/`, `bin/`, `.github/workflows/taijifu-core-contracts.yml`.
- Produces: automated guard proving the platform workspace coexists with legacy/canonical surfaces.

- [ ] **Step 1: Write the failing/pinning legacy-preservation test**

Assert that `wordpress/`, `brand/`, `docs/`, `bin/` exist; assert `.github/workflows/taijifu-core-contracts.yml` still references `wordpress/plugins/taijifu-core/**`; assert the new workspace globs do not include `wordpress/**`.

- [ ] **Step 2: Run the guard**

Run: `pnpm exec vitest run tests/architecture/legacy-coexistence.test.ts`
Expected: PASS on preserved legacy structure; any accidental relocation/deletion must FAIL.

- [ ] **Step 3: Add the guard to `architecture:test`**

`architecture:test` must execute all files under `tests/architecture/`.

- [ ] **Step 4: Verify root architecture gate**

Run: `pnpm architecture:test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add package.json tests/architecture/legacy-coexistence.test.ts
git commit -m "test(platform): guard WordPress and canon coexistence"
```

### Task 3: Domain Primitive Boundaries

**Files:**
- Create: `packages/domain/package.json`
- Create: `packages/domain/tsconfig.json`
- Create: `packages/domain/src/index.ts`
- Create: `packages/domain/src/identity/tuid.ts`
- Create: `packages/domain/src/capabilities/capability.ts`
- Create: `packages/domain/src/context/platform-context.ts`
- Create: `packages/domain/src/identity/tuid.test.ts`

**Interfaces:**
- Consumes: TypeScript root configuration.
- Produces: `Tuid` branded type; `parseTuid(value: string): Tuid`; `Capability` string-branded type; `PlatformContext` union for `personal | teacher | dojo | research | competition | family-junior`.

- [ ] **Step 1: Write failing TUID tests**

Tests assert `parseTuid('tuid_01HZX...')` accepts the canonical `tuid_` prefix plus non-empty identifier body, while empty, whitespace-only, or non-`tuid_` strings throw `InvalidTuidError`.

- [ ] **Step 2: Run tests and confirm failure**

Run: `pnpm --filter @taijifu/domain test`
Expected: FAIL because the domain package/API does not exist.

- [ ] **Step 3: Implement the minimal domain primitives**

Export only public primitives from `src/index.ts`; do not introduce authentication-provider types, database models, framework decorators or infrastructure imports.

- [ ] **Step 4: Verify domain package**

Run: `pnpm --filter @taijifu/domain test && pnpm --filter @taijifu/domain typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/domain
git commit -m "feat(domain): add sovereign identity and context primitives"
```

### Task 4: Contracts and Event Envelope

**Files:**
- Create: `packages/contracts/package.json`
- Create: `packages/contracts/tsconfig.json`
- Create: `packages/contracts/src/index.ts`
- Create: `packages/contracts/src/health/platform-health.ts`
- Create: `packages/events/package.json`
- Create: `packages/events/tsconfig.json`
- Create: `packages/events/src/index.ts`
- Create: `packages/events/src/domain-event.ts`
- Create: `packages/events/src/domain-event.test.ts`

**Interfaces:**
- Consumes: `Tuid` only through the public `@taijifu/domain` export when identity is needed.
- Produces: `DomainEvent<TType, TPayload>` with `eventId`, `eventType`, `eventVersion`, `occurredAt`, `correlationId`, optional `causationId`, and `payload`; `createDomainEvent(...)`; transport-neutral `PlatformHealth` contract.

- [ ] **Step 1: Write failing event-contract tests**

Assert `createDomainEvent` rejects empty `eventType`, versions `< 1`, invalid ISO timestamps, and missing correlation IDs; assert valid events preserve payload without adding transport/provider fields.

- [ ] **Step 2: Run tests and confirm failure**

Run: `pnpm --filter @taijifu/events test`
Expected: FAIL because event contracts are absent.

- [ ] **Step 3: Implement the transport-neutral contracts**

Do not import NestJS, Next.js, Supabase, NATS or database libraries into `contracts` or `events`.

- [ ] **Step 4: Verify contracts/events**

Run: `pnpm --filter @taijifu/contracts typecheck && pnpm --filter @taijifu/events test && pnpm --filter @taijifu/events typecheck`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add packages/contracts packages/events
git commit -m "feat(platform): define transport-neutral contracts and events"
```

### Task 5: Architecture Boundary Enforcement

**Files:**
- Create: `.dependency-cruiser.cjs`
- Create: `tests/architecture/dependency-boundaries.test.ts`
- Create: `tests/architecture/fixtures/forbidden-deep-import.ts`
- Create: `tests/architecture/fixtures/forbidden-provider-import.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: workspace package naming convention `@taijifu/*` and target tree.
- Produces: enforceable rules forbidding cross-package `/src/` deep imports, domain→infrastructure imports, and direct provider SDK imports from `apps/*`.

- [ ] **Step 1: Write fixtures that intentionally violate boundaries**

Fixture A imports `@taijifu/domain/src/identity/tuid`; Fixture B imports `@supabase/supabase-js` from an app fixture.

- [ ] **Step 2: Write the architecture test**

Assert dependency-cruiser reports both fixture violations and reports zero violations for real production workspace sources.

- [ ] **Step 3: Run and confirm failure before rules exist**

Run: `pnpm architecture:test`
Expected: FAIL because dependency rules are not configured.

- [ ] **Step 4: Implement dependency rules**

Allow provider SDKs only under `platform/infrastructure/**` in Foundation V1. Allow packages to consume only another package's declared public export surface.

- [ ] **Step 5: Verify architecture gate**

Run: `pnpm architecture:test`
Expected: PASS for production sources while the test proves the violating fixtures are detected.

- [ ] **Step 6: Commit**

```bash
git add .dependency-cruiser.cjs package.json tests/architecture
git commit -m "test(architecture): enforce sovereign package boundaries"
```

### Task 6: Web and Command Center Shells

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.ts`
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/page.tsx`
- Create: `apps/web/app/health/page.tsx`
- Create: `apps/admin/package.json`
- Create: `apps/admin/tsconfig.json`
- Create: `apps/admin/next.config.ts`
- Create: `apps/admin/app/layout.tsx`
- Create: `apps/admin/app/page.tsx`
- Create: `apps/admin/app/health/page.tsx`
- Create: `apps/web/app/page.test.tsx`
- Create: `apps/admin/app/page.test.tsx`

**Interfaces:**
- Consumes: public contracts only; no database/provider access.
- Produces: independently buildable Web shell and Command Center shell with explicit placeholder boundaries for future Experience Modules.

- [ ] **Step 1: Write failing shell tests**

Web test asserts the shell identifies itself as `TAIJIFU` and exposes no admin control surface. Admin test asserts `TAIJIFU Command Center` and no public-site content dependency.

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm --filter @taijifu/web test && pnpm --filter @taijifu/admin test`
Expected: FAIL because apps do not exist.

- [ ] **Step 3: Implement minimal Next.js shells**

Keep UI intentionally minimal. Do not implement product modules in this foundation task.

- [ ] **Step 4: Verify both apps**

Run: `pnpm --filter @taijifu/web test && pnpm --filter @taijifu/admin test && pnpm --filter @taijifu/web build && pnpm --filter @taijifu/admin build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/web apps/admin
git commit -m "feat(experience): add web and command center shells"
```

### Task 7: API Shell with Sovereign Health Contract

**Files:**
- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/health/health.controller.ts`
- Create: `apps/api/src/health/health.controller.spec.ts`

**Interfaces:**
- Consumes: `PlatformHealth` from `@taijifu/contracts`.
- Produces: Fastify-backed NestJS API with `GET /health` returning `{ service: 'taijifu-api', status: 'healthy' }` under the shared contract.

- [ ] **Step 1: Write failing health-controller test**

Assert exact service/status values and that the controller's return type satisfies `PlatformHealth`.

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm --filter @taijifu/api test`
Expected: FAIL because API shell does not exist.

- [ ] **Step 3: Implement NestJS/Fastify shell**

`main.ts` must use `FastifyAdapter`; no database, auth provider or domain feature module is introduced yet.

- [ ] **Step 4: Verify API**

Run: `pnpm --filter @taijifu/api test && pnpm --filter @taijifu/api build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/api
git commit -m "feat(api): add sovereign platform API shell"
```

### Task 8: Worker, SDK and Infrastructure Ports

**Files:**
- Create: `services/worker/package.json`
- Create: `services/worker/tsconfig.json`
- Create: `services/worker/src/index.ts`
- Create: `services/worker/src/worker.ts`
- Create: `services/worker/src/worker.test.ts`
- Create: `packages/sdk/package.json`
- Create: `packages/sdk/tsconfig.json`
- Create: `packages/sdk/src/index.ts`
- Create: `packages/sdk/src/health-client.ts`
- Create: `packages/design-system/package.json`
- Create: `packages/design-system/tsconfig.json`
- Create: `packages/design-system/src/index.ts`
- Create: `packages/hnk/package.json`
- Create: `packages/hnk/tsconfig.json`
- Create: `packages/hnk/src/index.ts`
- Create: `platform/infrastructure/package.json`
- Create: `platform/infrastructure/tsconfig.json`
- Create: `platform/infrastructure/src/index.ts`
- Create: `platform/infrastructure/src/ports/auth-provider.ts`
- Create: `platform/infrastructure/src/ports/object-storage.ts`
- Create: `platform/infrastructure/src/ports/realtime-provider.ts`

**Interfaces:**
- Consumes: contracts/events public exports.
- Produces: `runWorkerOnce(): Promise<WorkerRunResult>` placeholder that performs no broker/database work yet; `HealthClient` first-party SDK boundary; provider-neutral `AuthProvider`, `ObjectStorage`, `RealtimeProvider` ports; empty-but-buildable Design System and HNK package boundaries.

- [ ] **Step 1: Write failing worker and SDK tests**

Worker test asserts an idle run returns `{ processed: 0, status: 'idle' }`. SDK test uses an injected `fetch` function and asserts `/health` is called without provider/database knowledge.

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm --filter @taijifu/worker test && pnpm --filter @taijifu/sdk test`
Expected: FAIL because boundaries do not exist.

- [ ] **Step 3: Implement minimal worker, SDK and infrastructure ports**

Do not install Supabase or a broker yet. Ports express capabilities without selecting providers.

- [ ] **Step 4: Verify all new boundaries**

Run: `pnpm --filter @taijifu/worker test && pnpm --filter @taijifu/sdk test && pnpm typecheck && pnpm build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add services/worker packages/sdk packages/design-system packages/hnk platform/infrastructure
git commit -m "feat(platform): add worker sdk and infrastructure ports"
```

### Task 9: Unified CI Gate

**Files:**
- Create: `.github/workflows/taijifu-platform.yml`
- Preserve: `.github/workflows/taijifu-core-contracts.yml`
- Modify: `README.md`

**Interfaces:**
- Consumes: root workspace commands and existing PHP contract workflow.
- Produces: Node platform CI gate plus documented local verification commands; does not replace WordPress CI.

- [ ] **Step 1: Add a CI-configuration test**

Extend `tests/architecture/legacy-coexistence.test.ts` to assert both workflow files exist and the platform workflow runs `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm architecture:test`, and `pnpm build`.

- [ ] **Step 2: Run and confirm failure**

Run: `pnpm architecture:test`
Expected: FAIL because `taijifu-platform.yml` does not yet exist.

- [ ] **Step 3: Create platform CI and update README**

Use Node 22 + Corepack/pnpm cache. Keep the existing PHP workflow untouched. README must document the coexistence model and the five root verification commands.

- [ ] **Step 4: Run complete local gate**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm architecture:test && pnpm build`
Expected: PASS.

- [ ] **Step 5: Verify legacy PHP contracts separately**

Run using the existing documented WordPress/PHP test environment: `phpunit --bootstrap wordpress/plugins/taijifu-core/tests/bootstrap.php wordpress/plugins/taijifu-core/tests`
Expected: PASS. If the local environment lacks the WordPress test database, record that limitation and require the unchanged GitHub Actions `TAIJIFU Core Contracts` job to be green before merge; do not weaken or delete the gate.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/taijifu-platform.yml README.md tests/architecture/legacy-coexistence.test.ts
git commit -m "ci(platform): add unified TAIJIFU platform gate"
```

### Task 10: Foundation Acceptance Gate

**Files:**
- Create: `docs/architecture/FOUNDATION-V1.md`
- Modify only if evidence requires: files created in Tasks 1–9.

**Interfaces:**
- Consumes: all Foundation V1 deliverables.
- Produces: auditable acceptance record mapping Blueprint invariants to executable gates and explicitly listing deferred subsystems.

- [ ] **Step 1: Write Foundation acceptance document**

Record exact commands, package boundaries, legacy coexistence status, current physical topology, and deferred items: Mobile Expo runtime, PostgreSQL schema, Auth provider, Outbox persistence, Supabase adapter, NATS, graph DB, full Design System, HNK Symbolic Engine implementation, domain modules.

- [ ] **Step 2: Run the complete Node gate from repository root**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm architecture:test && pnpm build`
Expected: all PASS, zero architecture violations in production sources.

- [ ] **Step 3: Confirm no legacy tree deletion/move occurred**

Run: `git diff --name-status <foundation-base>...HEAD`
Expected: no `D` or rename entries for existing `wordpress/`, `brand/`, `docs/`, `bin/` canonical/legacy files except the intentional new/modified documentation files named by this plan.

- [ ] **Step 4: Verify Git cleanliness**

Run: `git diff --check`
Expected: no output.

- [ ] **Step 5: Commit acceptance record**

```bash
git add docs/architecture/FOUNDATION-V1.md
git commit -m "docs(platform): record Foundation V1 acceptance"
```

---

## Self-Review Result

### Spec coverage

Foundation V1 deliberately implements only the cross-cutting foundation required before domain work: sovereign monorepo, coexistence, public package boundaries, initial Web/Admin/API/Worker topology, contract/event primitives, provider ports, architecture tests and CI. The following Blueprint areas are **not missing**; they are explicitly deferred to dedicated specs/plans because each is an independently reviewable subsystem: Mobile runtime, Identity/TUID persistence and auth, PostgreSQL/data architecture, Outbox persistence, Trust/Evidence, Martial Graph/Knowledge, Academy, Training/Coach, Social, Dojo Network, Journey/RPG, Economy, Media/Vision, Intelligence Fabric, observability backend and resilience drills.

### Step scan

Each task ends in an independently testable deliverable and commit. Setup is folded into the first deliverable that needs it; no service extraction or provider selection is hidden inside foundation setup.

### Type consistency

`Tuid`, `PlatformContext`, `DomainEvent`, `PlatformHealth`, provider ports and SDK boundaries are introduced once and consumed through package public exports only.

### Review Focus coverage

Legacy coexistence → Tasks 2/9; forbidden coupling/provider leakage → Task 5; contract drift → Task 4; independent bootability → Tasks 6–9.

### Proportion

The plan specifies decisions and verification, not implementation bodies. Product-domain behavior remains outside this plan.

## Execution Gate

Implementation must begin from an isolated worktree/branch at execution time. Do not implement Foundation V1 directly on `main`.

Recommended execution mode: **Native**, because the ten tasks are strongly sequential around shared workspace interfaces and the plan already pins review gates after each slice. A fresh whole-branch review remains required before merge.
