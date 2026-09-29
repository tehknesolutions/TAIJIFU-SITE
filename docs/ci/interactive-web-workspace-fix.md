# Interactive Web workspace CI fix

The app uses `@taijifu/design-tokens` with `workspace:*`, so CI verification must preserve pnpm workspace discovery. The dedicated workflow now installs the root lockfile and scopes typecheck, tests, and build to `@taijifu/interactive-web` with pnpm filters.
