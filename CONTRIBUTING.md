# Contributing to Rocket

Thanks for your interest in contributing to Rocket. This guide covers everything you need to get started.

## Getting Set Up

**Prerequisites:**
- Node.js 24+
- pnpm 10+ (enable with `corepack enable`)

**Steps:**

```bash
# Fork and clone the repo
git clone https://github.com/mboudriga/rocket.git
cd rocket

# Install dependencies
pnpm install

# Start the flagship app
pnpm turbo dev --filter=@app/vite-tanstack-router-starter

# Start Storybook
pnpm turbo dev --filter=@rocket/ui
```

## Making Changes

1. Create a branch from `main` with a descriptive name (`feat/add-datatable-sorting`, `fix/dialog-z-index`)
2. Make your changes
3. Run `pnpm validate` to confirm linting, type checking, unused code detection, and dependency auditing all pass
4. Run `pnpm test` for unit tests
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) format:
   - `feat: add sorting to DataTable`
   - `fix: resolve Dialog z-index on mobile`
   - `docs: update getting started guide`
   - `chore: bump Vite to 8.1`

Lefthook will automatically run Biome and TypeScript checks on pre-commit, and commitlint will validate your commit message format.

## Pull Requests

- Keep PRs focused. One feature or fix per PR.
- Include a clear description of what changed and why.
- If your PR adds a new component to `@rocket/ui`, include a Storybook story.
- If your PR changes behavior, update or add tests.

## Project Structure

```
apps/           Application starters (don't modify unless fixing a starter-specific issue)
engine/
  rocket-ui/    Component library (most contributions go here)
  typescript-config/   Shared TS configs
  playwright-config/   Shared E2E configs
```

## Code Style

Biome handles formatting and linting. There is nothing to configure. Run `pnpm lint:fix` if your editor does not have the Biome extension.

Key conventions:
- Import UI components from `@rocket/ui`, never from `@chakra-ui/react` or `@ark-ui/react` directly in apps
- Use `Flex.V` and `Flex.H` for layout (not Stack/VStack/HStack)
- Use `gap` instead of `spacing`
- Use semantic color tokens (`fg`, `bg.surface`, `colorPalette.solid`) instead of raw colors
- Use custom breakpoints (`mobile`, `tablet`, `desktop`) instead of `sm`, `md`, `lg`

## Questions?

Open a thread in [GitHub Discussions](https://github.com/mboudriga/rocket/discussions).
