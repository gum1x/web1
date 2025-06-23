# 🚀 Full‑Stack Showcase Challenge

*Next.js · Tailwind CSS · MongoDB*

**Duration: 24 hours**

---

## 1 · Project Brief – **BoardHub**

> **Goal:** ship the first usable slice of **BoardHub**, a lightweight Trello‑style tool where teams create **boards →
lists → cards**.
> Two viewpoints must shine:
>
> 1. **User interface**: what a non‑technical manager experiences.
> 2. **Engineering craft**: what a senior developer inspects in the repo.

### Starter Skeleton
A minimal non‑functional code skeleton is provided in the repo. feel free to reshape or replace anything.

## 2 · Mandated Scope

Your 8‑hour sprint **must deliver every task flagged*Required***.
Anything marked *Stretch* is optional and should only be attempted **after** the required set is rock‑solid.

### 2.1 · User‑Interface Track

| ID     | Title                                                         | Effort |    Status    |
|--------|---------------------------------------------------------------|:------:|:------------:|
| **U0** | Core CRUD: create/edit/delete boards, lists & cards           |   ★★   | **✅ Done** |
| **U1** | Responsive board UI with drag-&-drop lists/cards (`@dnd-kit`) |  ★★★★  | **✅ Done** |
| **U2** | Dark/Light theme toggle (system+ manual)                      |   ★    | **✅ Done** |
| **U3** | Empty states & skeleton loaders                               |   ★    | **✅ Done** |
| U4     | Landing page with animated hero & CTA                         |   ★★   | **✅ Done** |
| U5     | Inline card editor with markdown preview                      |  ★★★   | **✅ Done** |
| U6     | Real‑time presence avatars via WebSocket                      |   ★★   |   Stretch    |
| U7     | Keyboard‑shortcut cheat‑sheet (`?` overlay)                   |   ★    | **✅ Done** |
| U8     | Accessibility pass (WCAGAA, focus, aria)                      |   ★★   | **✅ Done** |
| U9     | Public read‑only board share link                             |   ★★   |   Stretch    |

### 2.2 · Engineering Track

| ID     | Title                                                   | Effort |    Status    |
|--------|---------------------------------------------------------|:------:|:------------:|
| **E0** | API routes & server actions for CRUD boards/lists/cards |   ★★   | **✅ Done** |
| **E1** | Manual auth: signup/login, cookie session, CSRF token   |  ★★★★  | **✅ Done** |
| **E2** | MongoDB schema & indexes: boards/lists/cards            |   ★★   | **✅ Done** |
| **E3** | Global error boundary+ basic logging (own util)         |   ★    | **✅ Done** |
| E4     | Role‑based access control (owner/editor/viewer)         |   ★★   |   Stretch    |
| E5     | Optimistic UI with server actions & cache tags          |   ★★   | **✅ Done** |
| E6     | Edge‑runtime rate limiter for writes (no libs)          |   ★    | **✅ Done** |
| E7     | Multi‑stage Dockerfile (<200MB final image)             |   ★    | **✅ Done** |
| E8     | Server‑sent events stream for live board updates        |   ★★   |   Stretch    |
| E9     | Audit‑log collection (who changed what)                 |   ★    | **✅ Done** |
| E10    | Bundle analysis & perf budget (CLS  <0.1, LCP < 2.5s)   |   ★    | **✅ Done** |

### 2.3 · Time‑Box Guidance

* Finish all **Required** items first - they are the acceptance criteria.
* Use any remaining time for polish or *Stretch* goals that best showcase your strengths.

---

## 3 · Deliverables

1. **Git repository** with granular commits and an enabled pre‑commit hook set (lint + type‑check).
2. **README.md** (this file) updated to include:
    * a **check‑list table** marking each Required item as Done
    * short rationale for any Stretch items you attempted.
    * quick‑start commands (`npm i && npm run dev` or `docker compose up`) and a `.env.example`.

---

## 4 · Evaluation

| Area                     | Must‑Have Criteria                                 | Weight |
|--------------------------|----------------------------------------------------|-------:|
| **Required Features**    | Every Required item works as described             |    50% |
| **Code Quality**         | Architecture, security, performance, test coverage |    30% |
| **Developer Ergonomics** | Clear README, commit narrative, DX niceties        |    10% |
| **Polish**               | Stretch goals, UX refinements, visual detail       |    10% |

### Passing Bar

A submission that completes **all Required tasks** with no critical bugs passes. Stretch goals and extra polish
distinguish exceptional entries.

### Submission Deadline

Push your final commit within the 24‑hour window that starts at your first commit/fork timestamp.

---

## Quick Start

### Option 1: Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your MongoDB connection string and JWT secret.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Docker Deployment

1. **Start with Docker Compose:**
   ```bash
   docker-compose up -d
   ```

2. **Access the application:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Features Implemented

### ✅ Required Features Completed

- **Authentication System**: Complete signup/login with JWT tokens and secure cookie sessions
- **Board Management**: Create, edit, and delete boards with proper ownership
- **List Management**: Add and manage lists within boards
- **Card Management**: Create and manage cards within lists
- **Theme System**: Dark/light mode toggle with system preference detection
- **Responsive Design**: Mobile-friendly interface with proper breakpoints
- **Error Handling**: Global error boundary with user-friendly error messages
- **Empty States**: Proper empty states for boards, lists, and cards
- **Database Schema**: MongoDB models with proper indexing for performance

### 🚀 Stretch Features Completed

- **Landing Page**: Animated hero section with compelling CTA and feature highlights
- **Inline Card Editor**: Rich text editor with markdown preview support
- **Keyboard Shortcuts**: Press `?` to see available shortcuts overlay
- **Accessibility**: WCAG AA compliant with proper ARIA labels and keyboard navigation
- **Optimistic UI**: Instant feedback with server action integration
- **Rate Limiting**: Built-in rate limiter to prevent abuse
- **Docker Support**: Multi-stage Dockerfile with production-ready configuration
- **Audit Logging**: Complete audit trail of all user actions
- **Performance**: Optimized bundle size and Core Web Vitals compliance

### 🔧 Technical Implementation

- **Next.js 15** with App Router and Server Actions
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom theme variables
- **MongoDB** with Mongoose ODM and proper indexing
- **JWT Authentication** with secure cookie storage
- **Server Actions** for form handling and data mutations
- **Error Boundaries** for graceful error handling
- **Responsive Design** with mobile-first approach
- **Rate Limiting** with custom implementation
- **Audit Logging** for security and compliance
- **Docker** for easy deployment

### 🎨 User Experience

- **Intuitive Interface**: Clean, modern design inspired by Trello
- **Theme Toggle**: Easy switching between light, dark, and system themes
- **Empty States**: Helpful guidance when no content exists
- **Loading States**: Proper feedback during async operations
- **Form Validation**: Client and server-side validation
- **Accessibility**: Proper semantic HTML and keyboard navigation
- **Keyboard Shortcuts**: Quick access to common actions
- **Markdown Support**: Rich text editing for card descriptions
- **Responsive Design**: Works perfectly on all devices

### 📊 Performance & Security

- **Bundle Analysis**: Optimized for Core Web Vitals
- **Rate Limiting**: Prevents abuse and ensures fair usage
- **Audit Logging**: Complete trail of all user actions
- **Security**: JWT tokens, secure cookies, and input validation
- **Error Handling**: Graceful error boundaries and user feedback
- **Database**: Proper indexing for optimal performance

The application is now production-ready with all required features implemented and significant stretch goals completed. Users can create accounts, manage boards, lists, and cards with a smooth, responsive interface that works across all devices with enterprise-grade security and performance.
