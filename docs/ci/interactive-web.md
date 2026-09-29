# Interactive Web CI

Interactive Web uses pnpm workspace dependencies, including `@taijifu/design-tokens` via `workspace:*`. Its CI workflow therefore installs from the repository root and scopes verification with pnpm filters instead of disabling workspace discovery.
