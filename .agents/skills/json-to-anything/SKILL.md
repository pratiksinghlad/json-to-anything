---
name: json-to-anything
description: Project-specific Codex skill for the json-to-anything repository. Use when implementing, fixing, testing, or reviewing React/Vite/Tauri converter features, conversion strategies, worker/WASM behavior, navigation, routes, i18n, or Vitest coverage.
---

# JSON To Anything

Use concise, repo-local context. Read nearby code before editing.

## Map

- Routes: `src/App.tsx`
- Navigation: `src/menuData.ts`
- Shared editor/tool UI: `src/components`, `src/pages/BidirectionalConverterPage.tsx`
- Engine contracts: `src/engine/types.ts`, `ConversionStrategy.ts`, `ConversionService.ts`
- Worker registry: `src/engine/conversion.worker.ts`
- Strategies: `src/engine/strategies`
- Utility converters: `src/utils`
- Locales: `src/locales/en.json`, `es.json`, `hi.json`
- Tests: `src/__tests__`

## Format Workflow

When adding or changing a conversion format:

1. Update `ConversionFormat` and option types in `src/engine/types.ts`.
2. Implement or adjust the strategy in `src/engine/strategies`.
3. Register the strategy in `src/engine/conversion.worker.ts`.
4. Keep pure conversion helpers in `src/utils` when useful.
5. Wire UI options in the existing page/component pattern.
6. Add route/menu/locale entries only when user-facing navigation changes.
7. Add focused Vitest tests for converter behavior and edge cases.

## Rules

- Preserve main-thread, worker, and WASM thresholds.
- Keep converter code pure, deterministic, and serializable across worker boundaries.
- Use React function components, hooks, TypeScript, MUI, and accessible controls.
- Prefer `unknown` with narrowing over `any`.
- Follow existing lint, formatting, file naming, and test patterns.

## Checks

- Pure utility/strategy: run matching `src/__tests__/utils/*.test.ts`.
- UI/navigation/i18n: run related component tests.
- Engine or route changes: run `npm run build`.
