---
name: coding-standards
description: Use for code quality, formatting, linting, review, refactor, and verification work in this repository. Applies the project's TypeScript, React, ESLint, Prettier, testing, and build standards with concise, high-signal guidance for AI coding agents.
---

# Coding Standards

Follow the repo, not generic preferences. Read nearby files before editing and keep changes scoped.

## Baseline

- TypeScript strict mode, ES2022, React JSX runtime.
- Prettier: 2 spaces, semicolons, double quotes, trailing commas, 100 char print width.
- ESLint: `@eslint/js`, `typescript-eslint`, React Hooks, React Refresh.
- Avoid `any`; use `unknown`, generics, or narrowed domain types.
- Do not add lint disables unless the codebase already requires one for the same pattern.

## Quality Rules

- Prefer simple typed functions over clever abstractions.
- Keep pure conversion logic separate from React UI state.
- Preserve accessibility: semantic HTML, labels, keyboard behavior, status roles.
- Keep comments rare and useful; explain intent, edge cases, or non-obvious constraints.
- Do not introduce dependencies for small helpers.
- Do not touch unrelated files or reformat broad areas.

## Verification

- Pure utility or strategy: run the matching Vitest file.
- Shared engine, worker, route, or type change: run related tests and `npm run build`.
- UI behavior: run related component tests; use build as the final confidence check.
- If a command fails, report the failing command and the actionable error.
