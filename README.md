# Fetch UI

> Real-time design token studio and architectural UI system catalog built with Next.js 15 Turbopack, React 19, and Tailwind CSS.

**Live Demo:** [https://fetch-studio.vercel.app](https://fetch-studio.vercel.app)

Fetch UI is a developer-focused design studio that bridges token curation with interactive, high-reliability software components. Rather than offering basic primitive shapes, Fetch UI features 31 production-grade engineering blocks such as CI/CD deployment pipelines, specular fintech cards, cryptographic secret rotation modals, telemetry dials, and collaborative presence indicators.

---

## Key Features

- **31 Architectural Systems**: Pre-configured interactive systems complete with client state, keyboard accessibility, and real-time event simulation.
- **Dynamic Token Customizer**: Instant live tweaking of primary accents, surface hues, border treatments, radiuses, and font pairings.
- **Copy-Paste Tailwind JSX**: Export production-ready TypeScript JSX blocks with self-contained styles and zero external bloat.
- **Authentication**: Flexible authentication with GitHub device code flows, Google OAuth integration, and sandbox bypass options.
- **Accessible & Tested**: Full test coverage across 11 test suites verifying accessibility standards, serialization safety, and state flows.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router with Turbopack)
- **Runtime**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Primitives**: Radix UI (Dialog, Slider)
- **Icons**: Lucide React
- **Testing**: Vitest with React Testing Library

---

## Getting Started

Follow these steps to clone, configure, and rebuild this application locally.

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (version 18.18.0 or newer; Node.js 20+ recommended)
- npm (version 9+ or newer) or pnpm

### 1. Clone the Repository

```bash
git clone https://github.com/azurelikestocode/fetch.git
cd fetch
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a local environment file based on `.env.example`:

```bash
cp .env.example .env.local
```

For basic local preview and studio usage, default guest modes work without external credentials. If you wish to enable GitHub and Google OAuth, add your client keys to `.env.local`:

```env
# GitHub OAuth (https://github.com/settings/applications/new)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth (https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Run the Development Server

Start the local server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Running Tests

Run the test suite to verify all component and serialization assertions:

```bash
npm test
```

### 6. Building for Production

Compile an optimized production bundle:

```bash
npm run build
npm start
```

---

## Project Structure

```
├── app/
│   ├── api/auth/            # OAuth and GitHub device code authentication endpoints
│   ├── components/          # Catalog browse and filter page
│   ├── dashboard/           # User saved favorites and export analytics
│   ├── studio/[id]/         # Real-time token studio and code generator
│   └── page.tsx             # Editorial landing page
├── components/
│   ├── catalog/             # Search filters, sorting, and scaled component cards
│   ├── landing/             # Editorial sections and live showcase
│   ├── studio/              # Interactive canvas preview, token editors, code export
│   └── ui/                  # Accessible baseline primitives
├── context/
│   └── auth-context.tsx     # Session management, favorites, and telemetry state
├── lib/
│   ├── templates.ts         # Registry of 31 full-fidelity architectural systems
│   ├── tokens.ts            # Design token presets and color manipulation helpers
│   └── utils.ts             # Style merging utilities
└── tests/                   # Vitest unit and integration test suites
```

---

## Deploying to Vercel

Fetch UI is configured for zero-configuration deployment on Vercel:

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the `azurelikestocode/fetch` repository.
4. Add any desired environment variables (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, etc.) under Project Settings.
5. Click **Deploy**. Vercel will automatically run `npm run build` and provision your production deployment.

---

## License

This project is licensed under a custom source-available license. You may inspect, evaluate, and run this code locally for personal educational purposes. Any public hosting, redistribution, or commercial use requires prior written consent from the author. See [LICENSE](LICENSE) for full details.
