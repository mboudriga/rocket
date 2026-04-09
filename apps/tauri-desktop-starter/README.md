# Tauri Starter

Tauri v2 desktop application with React + Vite frontend and Rust backend.

## Prerequisites

1. **Rust toolchain** — Install via [rustup](https://rustup.rs/):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```

2. **Platform-specific dependencies** — See [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/):
   - **Windows**: Microsoft Visual Studio C++ Build Tools, WebView2 (pre-installed on Windows 11)
   - **macOS**: Xcode Command Line Tools (`xcode-select --install`)
   - **Linux**: `sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev`

3. **Node.js 24+** and **pnpm 10+** (already required by the monorepo)

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server (port 3006) |
| `pnpm build` | Build frontend for production |
| `pnpm tauri:dev` | Launch desktop app in dev mode |
| `pnpm tauri:build` | Build production desktop app |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm lint` | Biome linter |
| `pnpm clean` | Remove build artifacts |

## Architecture

```
src/                    React frontend (@rocket/ui)
  components/
    Titlebar/           Custom window titlebar (decorations: false)
    Sidebar/            Navigation sidebar
    common/             Shared components
  pages/                App pages (Home, Files, Notes, Settings, About)
  hooks/                Custom React hooks
  services/             Tauri command invoke wrappers
  stores/               Zustand state management
  styles/               Global CSS

src-tauri/              Rust backend
  src/
    commands/           Tauri IPC command handlers
    lib.rs              Plugin registration & setup
    main.rs             Entry point
    tray.rs             System tray
  capabilities/         Permission definitions
  tauri.conf.json       Tauri configuration
```

## Demo Pages

- **Home** — System information (hostname, OS, architecture, platform)
- **Files** — File browser using native dialog and filesystem plugins
- **Notes** — Persistent notes using Tauri store plugin
- **Settings** — User preferences persisted across sessions
- **About** — App information and tech stack

## Setup

After cloning, generate app icons before building:

```bash
cd apps/tauri-desktop-starter
pnpm tauri icon path/to/app-icon.png
```

This creates `src-tauri/icons/` with all required sizes. Without icons, `tauri build` will fail (dev mode works without them).
