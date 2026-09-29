# Interactive Web CI workspace contract

`apps/interactive-web` consumes `@taijifu/design-tokens` through the pnpm `workspace:*` protocol.

Its CI therefore runs from the repository workspace instead of creating an isolated package workspace or installing with npm `--workspaces=false`.

The dedicated Interactive Web workflow installs the root lockfile with pnpm and then scopes typecheck, test, and build to `@taijifu/interactive-web`. It watches the design-token package and workspace manifests because changes there can affect the app even when `apps/interactive-web/**` is unchanged.

`tests/architecture/interactive-web-workspace-ci.test.ts` guards this contract against regression.
