# Installation and setup

## Requirements:
1. Node LTS latest.
   - Verify node version using ``` node -v ```
2. Yarn to be setup (Requires node to be setup first)
   - Open cmd or powershell as admin by right-clicking through start.
   - Run this command ``` corepack enable ``` 

## Installation
1.  Redirect to mantine-frontend.
2.  Run ``` yarn ``` and wait for packages to be setup.
3.  Verify installation of packages by checking for node_modules/ directory and yarn.lock file.
4.  Run ``` npm run dev ``` to start server and redirect to ``` localhost:3000 ``` to check if app is loading.

## Development
-   Dashboard can be edited at ``` mantine-frontend\pages\dashboard\index.tsx ``` and can be tested at ``` localhost:3000/dashboard ```.


<-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------->

# Boilerplate README Section
## USE FOR REFERENCE

# Mantine Next Template

Get started with Mantine + Next with just a few button clicks.
Click `Use this template` button at the header of repository or [follow this link](https://github.com/mantinedev/mantine-next-template/generate) and
create new repository with `@mantine` packages. Note that you have to be logged in to GitHub to generate template.

## Features

This template comes with several essential features:

- Server side rendering setup for Mantine
- Color scheme is stored in cookie to avoid color scheme mismatch after hydration
- Storybook with color scheme toggle
- Jest with react testing library
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier