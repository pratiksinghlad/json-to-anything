---
name: json-to-anything-project
description: Use when implementing, fixing, testing, or reviewing this json-to-anything app. Gives compact project-specific rules for converters, navigation, routes, i18n, tests, and build checks.
---

# JSON To Anything Project Skill

Use this skill to avoid re-discovering the repo layout.

## Touchpoints

- Routes: `src/App.tsx`
- Navigation: `src/menuData.ts`
- Tool UI: `src/pages/BidirectionalConverterPage.tsx`
- Engine contracts: `src/engine/types.ts`, `ConversionStrategy.ts`, `ConversionService.ts`
- Worker registry: `src/engine/conversion.worker.ts`
- Strategies: `src/engine/strategies/*`
- Utilities: `src/utils/*`
- Locales: `src/locales/en.json`, `es.json`, `hi.json`
- Tests: `src/__tests__`

## Add Or Change A Conversion Format

1. Update `ConversionFormat` and options in `src/engine/types.ts`.
2. Add or update the strategy in `src/engine/strategies`.
3. Register the strategy for worker execution in `conversion.worker.ts`.
4. Wire UI options in `BidirectionalConverterPage.tsx` or a focused component/hook.
5. Add/update routes in `src/App.tsx` only when a new URL is needed.
6. Add/update `menuData.ts` and all locale JSON files when navigation text changes.
7. Add focused Vitest coverage for pure conversion behavior.

## Style

- React function components and hooks only.
- TypeScript first; avoid `any`.
- Prefer pure utilities and strategies with clear inputs/outputs.
- Use MUI components and `sx`; keep accessibility labels and keyboard behavior.
- Keep files small; extract hooks only when logic is reused or noisy.
- Follow `.prettierrc` and `eslint.config.js`.

## Verify

- Small pure change: run the matching Vitest file.
- Converter or worker change: run converter tests and `npm run build`.
- Navigation/i18n/routing change: run related component tests and `npm run build`.
