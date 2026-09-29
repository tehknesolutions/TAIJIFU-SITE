# Interactive Web workspace rationale

The Interactive Web package uses the pnpm `workspace:*` protocol for internal dependencies. Its CI must preserve workspace discovery and install the root lockfile before running package-scoped verification.
