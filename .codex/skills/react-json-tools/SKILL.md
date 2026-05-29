---
name: react-json-tools
description: Use when building, fixing, or reviewing React UI, routes, navigation, i18n, MUI styling, editor interactions, or converter pages in the json-to-anything app.
---

# React JSON Tools

Use existing app patterns before creating new ones.

## Project Map

- App shell/routes: `src/App.tsx`
- Main converter page: `src/pages/BidirectionalConverterPage.tsx`
- Navigation data: `src/menuData.ts`
- Navigation components: `src/components/navigation`
- Shared editor UI: `src/components/JsonEditor`
- Theme tokens: `src/themeConfig.ts`, `src/theme/uiSx.ts`
- Locales: `src/locales/en.json`, `es.json`, `hi.json`

## React Rules

- Use function components and hooks only.
- Type props explicitly with `type` or `interface`; destructure props with defaults when useful.
- Use MUI components and `sx`; prefer existing theme tokens and shared `uiSx` helpers.
- Keep route-level code lazy where the app already lazy-loads it.
- Put reusable behavior in hooks only when it removes real duplication or noisy component state.
- Keep controlled editor state predictable and avoid unnecessary re-renders for large payloads.

## UI Changes

- For a new visible tool, update route, menu item, locale keys, and tests together.
- Add all language keys when adding user-facing text.
- Use accessible button labels, live regions for async/status changes, and keyboard-safe controls.
- Keep desktop and mobile navigation consistent; `menuData.ts` is the source of truth.

## Checks

- Navigation/i18n: run navigation component tests.
- Page behavior: run the matching page/component tests or add focused coverage.
- Final check for route or app shell changes: `npm run build`.
