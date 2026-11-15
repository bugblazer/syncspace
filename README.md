# SyncSpace

SyncSpace is an open source chat app you can run on your own server. It's made for friend groups, clubs and small teams: you set up servers with channels, keep side conversations in threads, and search back through everything that's been said.

> SyncSpace is in early development and isn't usable yet. I'm rebuilding it from scratch, and the self-hosting guide will arrive with v1.

## Why SyncSpace

A lot of chat apps limit what you get unless you pay, whether that's how far back you can scroll or how many people can join. SyncSpace doesn't, and it won't start:

- Your whole message history stays available, and the only limit on users is what your server can handle.
- Running it takes one app container plus PostgreSQL, started with `docker compose up`. That setup comes with v1.
- Search covers every server you're in, and you can jump straight to an old message or pin the ones that matter.
- There's no ID or phone verification, and no tracking.

## What's planned for v1

Servers and text channels, owner/admin/member roles, invite links that can expire or be revoked, real-time messages you can edit and delete, threads, direct messages, typing indicators, online status, unread markers, @mentions, search, one inbox that collects what needs your attention from every server, and a setting that decides whether anyone can sign up or only invited people.

## Tech stack

| Area    | Used now                                                            | Planned                                |
| ------- | ------------------------------------------------------------------- | -------------------------------------- |
| Runtime | Node.js 26, TypeScript 6, npm workspaces                            |                                        |
| Server  | Express 5                                                           | PostgreSQL with Prisma, Socket.io, zod |
| Web     | React 19, Vite 8, Tailwind CSS 4                                    | Zustand                                |
| Quality | ESLint (typescript-eslint strict), Prettier, Vitest, GitHub Actions |                                        |

## Project structure

```text
apps/
  server/   Express API (TypeScript), tests in apps/server/test
  web/      React app (Vite, Tailwind)
tsconfig.base.json   Strict TypeScript rules every package extends
eslint.config.js     Lint rules for the whole repo
```

## Development setup

### Prerequisites

- Node.js 26 (the version in `.nvmrc`). A version manager such as [fnm](https://github.com/Schniz/fnm) can switch to it automatically.
- npm (comes with Node.js)

### Install

```sh
git clone https://github.com/bugblazer/syncspace.git
cd syncspace
npm ci
```

### Configure

Copy the server's example environment file and adjust it if needed:

```sh
cp apps/server/.env.example apps/server/.env
```

| Variable | Required | Description                                        |
| -------- | -------- | -------------------------------------------------- |
| `PORT`   | Yes      | Port the API server listens on, for example `3000` |

### Run

In two terminals:

```sh
npm run dev --workspace=@syncspace/server   # API on http://localhost:3000 (GET /api/health)
npm run dev --workspace=@syncspace/web      # Web app on http://localhost:5173
```

### Scripts

Run from the repository root:

| Command                | What it does                        |
| ---------------------- | ----------------------------------- |
| `npm run lint`         | ESLint over the whole repo          |
| `npm run typecheck`    | Type-checks every workspace         |
| `npm test`             | Runs every workspace's tests        |
| `npm run build`        | Builds every workspace              |
| `npm run format`       | Formats every file with Prettier    |
| `npm run format:check` | Reports files that aren't formatted |

CI runs `format:check`, `lint`, `typecheck`, `test` and `build` on every pull request and on pushes to `main`.

## Contributing

SyncSpace isn't accepting contributions yet.

## License

SyncSpace's code is licensed under the [GNU Affero General Public License v3.0 only](LICENSE) (AGPL-3.0-only). If you run a modified version as a network service, you must offer its source code to its users.

The SyncSpace name and logo are not covered by the code license. Forks must use a different name.
