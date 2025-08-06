# giok / 기억

A modern full-stack web application built to explore **Bun** and create a lightweight alternative to Next.js with complete end-to-end type safety.

## 🎯 Project Goals

This project serves as a learning playground to:

- **Understand Bun**: Explore Bun's capabilities as a JavaScript runtime, bundler, and package manager
- **Build without Next.js**: Create a React-based SSR application with more control over the bundle and less framework overhead
- **Achieve Full-Stack Type Safety**: Implement end-to-end type safety from database to frontend
- **Modern Web Architecture**: Combine the best of SSR (for SEO) and SPA (for interactivity)

## 🏗️ Architecture

This project uses a unique hybrid architecture that combines:

### Frontend Architecture

- **SSR Pages**: HTML pages with [HTMX](https://htmx.org/) for SEO-friendly, indexable content
- **React SPA**: Interactive application powered by [React 19](https://react.dev/) for dynamic features
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) for utility-first styling

### Backend Architecture

- **Runtime**: [Bun](https://bun.sh) as the core JavaScript runtime and package manager
- **API Framework**: [Elysia](https://elysiajs.com/) for type-safe API development
- **Database ORM**: [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations _(planned)_
- **Server**: Custom routing with Bun's native `serve()` function

### Project Structure

```
src/
├── api/                 # Elysia-powered API routes
├── app/                 # React SPA application
├── pages/               # SSR HTML pages (SEO-friendly)
├── public/              # Static assets
├── styles/              # Tailwind CSS
└── utils/               # Shared utilities
```

## 🚀 Key Features

### Hybrid Routing System

- **`/`**: SSR pages for optimal SEO and initial page loads
- **`/app/*`**: React SPA for interactive features
- **`/api/*`**: Type-safe API powered by Elysia

### Development Experience

- **Hot Module Replacement**: Built-in HMR with Bun
- **Type Safety**: Full TypeScript support across the stack
- **Fast Builds**: Leveraging Bun's native bundling capabilities
- **Tailwind Integration**: Bun plugin for seamless Tailwind compilation

## 🛠️ Technology Stack

| Layer        | Technology                                 | Purpose                                          |
| ------------ | ------------------------------------------ | ------------------------------------------------ |
| **Runtime**  | [Bun](https://bun.sh)                      | JavaScript runtime, bundler, and package manager |
| **Frontend** | [React 19](https://react.dev/)             | Interactive SPA components                       |
| **SSR**      | [HTMX](https://htmx.org/)                  | Server-side rendered pages                       |
| **Styling**  | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework                      |
| **API**      | [Elysia](https://elysiajs.com/)            | Type-safe web framework                          |
| **Database** | [Drizzle ORM](https://orm.drizzle.team/)   | Type-safe database toolkit _(planned)_           |

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.2.14 or higher

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd giok

# Install dependencies
bun install
```

### Development

```bash
# Start development server with hot reload
bun dev
```

Visit:

- `http://localhost:6969/` - SSR pages
- `http://localhost:6969/app` - React SPA
- `http://localhost:6969/api` - API endpoints

### Production

```bash
# Build the project
bun run build

# Start production server
bun start
```

## 🎯 Roadmap

- [ ] **Drizzle ORM Integration**: Add type-safe database operations
- [ ] **End-to-End Type Safety**: Implement shared types between frontend and backend
- [ ] **Authentication System**: Complete auth flow with secure session management
- [ ] **Database Schema**: Design and implement data models
- [ ] **API Expansion**: Build comprehensive API endpoints
- [ ] **Testing Suite**: Add unit and integration tests
- [ ] **Deployment**: Set up production deployment pipeline

## 🔍 Why This Stack?

### Bun Advantages

- **Speed**: Significantly faster than Node.js for most operations
- **Built-in Tools**: Bundler, test runner, and package manager included
- **Modern**: Native TypeScript support and ES modules

### No Next.js Benefits

- **Bundle Control**: Direct control over build process and output
- **Lightweight**: No framework overhead or magic
- **Learning**: Better understanding of underlying web technologies
- **Flexibility**: Custom routing and server logic

### Type Safety Goals

- **Database to API**: Drizzle ORM provides type-safe database operations
- **API to Frontend**: Elysia generates TypeScript types for API routes
- **Shared Types**: Common type definitions across the entire stack

## 📚 Learning Resources

- [Bun Documentation](https://bun.sh/docs)
- [Elysia Guide](https://elysiajs.com/introduction.html)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [HTMX Documentation](https://htmx.org/docs/)

---

_This project was created using `bun init` and serves as a learning platform for modern web development without the constraints of heavy frameworks._
