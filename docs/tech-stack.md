# Angel Number Calculator - Technology Stack

## 1. Overview
The project is built as a high-performance, interactive, and SEO-optimized web application using modern, type-safe full-stack technologies.

## 2. Core Stack Choices
We select the workspace-implied pathway using **TanStack Start** with a simplified, free-tier stack:

### Frontend & Full-Stack Routing
* **TanStack Start**: React-based framework leveraging Vite for compilation and TanStack Router for type-safe routing.
* **Tailwind CSS**: Utility-first styling framework.
* **Framer Motion**: Smooth 3-second cosmic loader animations and interactive elements.
* **Pnpm**: Monorepo/project dependency management tool.

### Backend & API
* **TanStack Server Functions / API Routes**: Running in Node.js to compute values, communicate with the database, and handle email dispatch.

### Database
* **PostgreSQL / SQLite**: To keep track of search inputs and optional subscriber info. Since it's a free tool, a lightweight PostgreSQL or SQLite is sufficient.

### Services & Integrations
* **SiliconFlow API**: Invokes the `deepseek-ai/DeepSeek-V4-Flash` model (OpenAI-compatible request payload) to generate reflective readings.
* **Resend**: Transactional email (optional, for sending free reports or subscription confirmations).
* **GA4 / PostHog**: Analytics for visitor usage tracking.

### Theme & Styling Strategy
* **CSS Custom Properties (Variables)**: Standardizing theme tokens for both Light Mode and Dark Mode.
* **Theme Switching**: Managed using a simple `.dark` class toggled on the `<html>` or `<body>` element. Persisted via `localStorage` and defaulted to Light Mode (`theme-light` style variables).
