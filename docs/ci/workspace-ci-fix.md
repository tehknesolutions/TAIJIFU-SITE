# Workspace-aware Interactive Web CI

The Interactive Web package consumes `@taijifu/design-tokens` through pnpm's `workspace:*` protocol. Its dedicated CI workflow must therefore install from the repository workspace and scope verification with pnpm filters rather than isolating the app and using npm with workspaces disabled.

The architecture regression test in `tests/architecture/interactive-web-workspace-ci.test.ts` enforces this contract.
