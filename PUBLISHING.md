# Publishing `@json-to-anything/engine` as an npm Package

This guide explains how to extract the conversion engine into a standalone, publishable npm package that other projects can install.

---

## Option A — Monorepo with npm Workspaces (Recommended)

### 1. Create the `packages/engine/` directory

```bash
mkdir -p packages/engine/src
```

### 2. Copy / symlink engine source

```bash
cp -r src/engine/*   packages/engine/src/
cp -r src/utils/*    packages/engine/src/utils/  # strategies depend on these
```

### 3. Create `packages/engine/package.json`

```json
{
  "name": "@json-to-anything/engine",
  "version": "0.1.0",
  "description": "High-performance JSON conversion engine with Web Worker + WASM support",
  "type": "module",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md"],
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --clean",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "react": ">=18"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  },
  "dependencies": {
    "uuid": "^11.0.0"
  }
}
```

### 4. Create `packages/engine/tsconfig.json`

```json
{
  "extends": "../../tsconfig.app.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### 5. Add `packages/engine` as a workspace in root `package.json`

```json
{
  "workspaces": ["packages/*"]
}
```

### 6. Install build tool + build

```bash
npm install -D tsup -w packages/engine
npm run build -w packages/engine
```

---

## Option B — Standalone Single-Package Repository

1. Create a new Git repository.
2. Copy `src/engine/` and `src/utils/` there.
3. Use the same `package.json` above as your root manifest.
4. Build with `tsup`.

---

## Publishing to npm

```bash
# Login
npm login

# Dry-run first (recommended)
npm publish --dry-run -w packages/engine

# Publish
npm publish --access public -w packages/engine
```

---

## Consuming in Another Project

```bash
npm install @json-to-anything/engine
```

```tsx
import { useConverter } from "@json-to-anything/engine";

const { convert, result } = useConverter({ workerThreshold: 256 * 1024 });
await convert(jsonStr, "csv", { separator: ",", includeHeader: true });
```

---

## Worker in Consumer Projects

Because the worker uses Vite's `?worker` + `new URL(...)` import pattern, the bundler of the consumer app must support this (Vite ≥ 3, Webpack 5 with `Worker` support).

If the consumer uses a different bundler, provide a pre-built worker via a `public/` file and adjust `WorkerManager.ts` to load it from an absolute URL instead.

---

## Checklist Before Publishing

- [ ] Run `npm run build` in `packages/engine` — zero errors
- [ ] Check `dist/` contains `index.js`, `index.cjs`, `index.d.ts`
- [ ] Run `npm pack` and inspect the tarball contents
- [ ] Verify `peerDependencies` (React ≥ 18) match consumer requirements
- [ ] Bump `version` in `package.json` using semver before each release
