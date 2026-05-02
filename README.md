# UniSkillSwap 🎓

> Campus Skill Exchange & Micro-Tutoring Platform

A fully interactive React front-end prototype for UniSkillSwap — a web platform that connects university students for peer-to-peer tutoring and skill exchange.

---

## 👥 Team Members

| Name | Role |
|------|------|
| Abdullah Albalwi | Project Manager / Scrum |
| Moayd Shahat | Frontend Lead |
| Ibrahim Alghamdi | Backend Lead |
| Ghazi Alansari | QA & Documentation |

---

## 📸 Features

### Student (Requester)
- Landing page with hero section
- Sign up / Login / Forgot Password
- Dashboard with recommended tutors & upcoming sessions
- Browse & filter tutors by subject, rating, session mode
- Tutor profile page with availability & reviews
- Book a session (modal with time slot selection)
- Post a help request with tags & difficulty level
- My Sessions (Upcoming / Past / Cancelled) with reschedule, cancel & review
- In-app messaging with real-time chat UI

### Tutor
- Tutor Dashboard with pending booking requests (Accept/Decline)
- Reputation panel with badges & stats
- My Offers management (create, edit, delete)
- Create New Offer form
- Availability Manager (weekly calendar grid)

### Admin
- Admin Login with 2FA field
- Admin Registration with access code
- Admin Dashboard with platform stats & recent activity
- User Management table (suspend, reactivate, delete)
- Tutor Verification Queue (approve/reject with credentials)
- Reports & Moderation (take action, dismiss, contact reporter)

---

## 🛠️ Tech Stack

### Front end
- **React 18** — UI framework
- **React Router v6** — client-side routing
- **Bootstrap 5** — responsive layout & utilities
- **Bootstrap Icons** — icon library
- **Google Fonts** — Plus Jakarta Sans + DM Sans

### Back end (Milestone 5)
- **Node.js** + **Express.js** — REST API
- **MongoDB** via **Mongoose** — persistence (local MongoDB or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **JWT** — authenticated routes
- **bcryptjs** — password hashing
- **express-validator** — request validation

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js 18+** (required for the API; CRA front end works on Node 16+)
- **npm** v8 or higher
- **MongoDB** running locally, or a **MongoDB Atlas** connection string

### Front end (React)

```bash
cd uniskillswap   # repository root
npm install
npm start
```

The app opens at **http://localhost:3000** (mock UI data unless you wire it to the API).

### Back end (Express API)

```bash
cd server
cp .env.example .env
# Edit .env: set MONGODB_URI, JWT_SECRET, and optionally PORT / CLIENT_ORIGIN

npm install
npm run seed    # optional: demo users + offers (see table below)
npm start       # default: http://localhost:5000
```

Health check: `GET http://localhost:5000/api/health`

**Environment variables (`server/.env`)**

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | Mongo connection string (e.g. `mongodb://127.0.0.1:27017/uniskillswap` or Atlas URI). |
| `JWT_SECRET` | Yes | Long random string used to sign tokens. |
| `PORT` | No | API port (default `5000`). |
| `JWT_EXPIRES_IN` | No | JWT lifetime (default `7d`). |
| `CLIENT_ORIGIN` | No | CORS origin for the React app (default `http://localhost:3000`). |
| `SEED_DEMO_PASSWORD` | No | Password for all accounts created by `npm run seed` (default `DemoPass123!`). |

Never commit `.env` or real Atlas credentials; `.gitignore` already excludes `.env`.

**Seed demo accounts** (after `npm run seed`)

| Role | Email | Password |
|------|-------|------------|
| Admin | `admin@uniskillswap.local` | `SEED_DEMO_PASSWORD` or `DemoPass123!` |
| Tutor | `tutor@uniskillswap.local` | same |
| Requester | `student@uniskillswap.local` | same |

Registering through the API cannot create `admin` users; use the seed script or create an admin directly in the database for production-like setups.

---

## 📡 API documentation

Base URL: `http://localhost:5000/api` (or your deployed host).

Unless noted, send JSON with header `Content-Type: application/json`. Protected routes require:

`Authorization: Bearer <token>`  
(Token from `POST /api/auth/login` or `POST /api/auth/register`.)

### Auth

| Method | Path | Auth | Body (JSON) | Success |
|--------|------|------|-------------|---------|
| POST | `/auth/register` | No | `name`, `email`, `password`, optional `role` (`requester` \| `tutor` \| `both`) | `201` `{ token, user }` |
| POST | `/auth/login` | No | `email`, `password` | `200` `{ token, user }` |

**Example — login**

```bash
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"student@uniskillswap.local\",\"password\":\"DemoPass123!\"}"
```

### Users

| Method | Path | Auth | Body | Success |
|--------|------|------|------|---------|
| GET | `/users/me` | Yes | — | `200` user profile |
| PATCH | `/users/me` | Yes | Optional: `name`, `bio`, `subject`, `skills`, `courses`, `pricing`, `sessionModes`, `availability` (object with lowercase weekday keys and string slot arrays) | `200` updated user |

### Tutors (public listing)

| Method | Path | Auth | Query | Success |
|--------|------|------|-------|---------|
| GET | `/tutors` | No | `search`, `minRating`, `tag`, `mode` (`Online` \| `On-Campus`) | `200` `{ tutors: [...] }` |
| GET | `/tutors/:id` | No | — | `200` `{ tutor, offers, reviewsList }` |

### Offers

| Method | Path | Auth | Notes |
|--------|------|------|--------|
| GET | `/offers` | No | Optional `?tutorId=<mongoId>` |
| GET | `/offers/mine` | Tutor / both | Lists current tutor’s offers |
| POST | `/offers` | Tutor / both | `title`, `subject`, optional `description`, `level`, `tags`, `mode`, `active`, `status` |
| PATCH | `/offers/:id` | Tutor / both | Owner only; partial update |
| DELETE | `/offers/:id` | Tutor / both | Soft-archives offer |

### Help requests

| Method | Path | Auth | Body |
|--------|------|------|------|
| POST | `/help-requests` | Requester / both | `title`, optional `description`, `tags`, `difficulty` |
| GET | `/help-requests/mine` | Requester / both | — |
| PATCH | `/help-requests/:id` | Requester / both | `status`: `open` \| `closed` |

### Sessions

| Method | Path | Auth | Body |
|--------|------|------|------|
| POST | `/sessions/book` | Requester / both | `tutorId`, `subject`, `date`, `time`, `mode` (`Online` \| `On-Campus`), optional `offerId`, `durationMinutes`, `note` |
| GET | `/sessions/mine` | Yes | — |
| PATCH | `/sessions/:id/status` | Yes | `status`: `confirmed` (tutor, pending→confirmed), `cancelled` (tutor or requester), `completed` (tutor, confirmed→completed) |

### Reviews

| Method | Path | Auth | Body |
|--------|------|------|------|
| POST | `/reviews` | Requester / both | `sessionId`, `rating` (1–5), optional `comment` (completed sessions only, one per session) |

### Messages

| Method | Path | Auth | Notes |
|--------|------|------|--------|
| GET | `/messages/threads` | Yes | Conversation list with last messages |
| GET | `/messages/with/:peerId` | Yes | Get or create DM thread with user `peerId` |
| POST | `/messages/with/:peerId` | Yes | `{ "text": "..." }` |

### Reports

| Method | Path | Auth | Body |
|--------|------|------|------|
| POST | `/reports` | Yes | `targetUserId`, `reason`, optional `details` |

### Admin (role `admin` only)

| Method | Path | Body / notes |
|--------|------|----------------|
| GET | `/admin/stats` | Aggregate counts |
| GET | `/admin/users` | All users (no password hash) |
| PATCH | `/admin/users/:id` | At least one of: `status` (`active` \| `suspended`), `verified` (boolean) |
| GET | `/admin/reports` | Moderation queue |
| PATCH | `/admin/reports/:id` | `status`: `pending` \| `reviewed` \| `dismissed` |

**Error responses** use JSON `{ "error": "..." }` and appropriate HTTP status codes (`400` validation, `401` auth, `403` forbidden, `404`, `409` conflict, `500`).

---

## 🔑 Demo Accounts (front-end mock)

The legacy CRA entry (`src/App.js`) still supports mock login rules:

| Role | How to trigger |
|------|----------------|
| **Student** | Any email (e.g. `student@university.edu`) |
| **Tutor** | Email containing "tutor" (e.g. `tutor@university.edu`) |
| **Admin** | Use `/admin/login` route |

---

## 📁 Project Structure

```
server/                     # Milestone 5 — Express + MongoDB API
├── .env.example
├── package.json
└── src/
    ├── index.js            # Bootstraps DB + HTTP server
    ├── app.js              # Express app, CORS, routes
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── seed.js
    └── utils/

src/                        # React front end
├── components/
│   └── Navbar.js           # Shared navigation bar
├── context/
│   └── AuthContext.js      # Authentication state (React Context)
├── data/
│   └── mockData.js         # All mock data (tutors, sessions, messages, etc.)
├── pages/
│   ├── LandingPage.js      # Public landing page
│   ├── auth/
│   │   ├── SignUp.js
│   │   ├── Login.js
│   │   ├── ForgotPassword.js
│   │   ├── AdminLogin.js
│   │   └── AdminRegister.js
│   ├── student/
│   │   ├── StudentDashboard.js
│   │   ├── BrowseTutors.js
│   │   ├── TutorProfile.js
│   │   ├── PostRequest.js
│   │   ├── MySessions.js
│   │   └── Messages.js
│   ├── tutor/
│   │   ├── TutorDashboard.js
│   │   ├── MyOffers.js
│   │   ├── CreateOffer.js
│   │   └── AvailabilityManager.js
│   └── admin/
│       ├── AdminDashboard.js
│       ├── AdminUsers.js
│       ├── AdminVerification.js
│       └── AdminReports.js
├── App.js                  # Routes configuration
├── index.js                # Entry point
└── index.css               # Global styles & CSS variables
```

---

## 🗺️ Route Map

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing Page | Public |
| `/signup` | Sign Up | Public |
| `/login` | Login | Public |
| `/forgot-password` | Forgot Password | Public |
| `/admin/login` | Admin Login | Public |
| `/admin/register` | Admin Register | Public |
| `/dashboard` | Student Dashboard | Student |
| `/browse` | Browse Tutors | Public |
| `/tutor/:id` | Tutor Profile | Public |
| `/post-request` | Post Help Request | Student |
| `/sessions` | My Sessions | Student |
| `/messages` | Messages | Student/Tutor |
| `/tutor-dashboard` | Tutor Dashboard | Tutor |
| `/my-offers` | My Offers | Tutor |
| `/create-offer` | Create Offer | Tutor |
| `/availability` | Availability Manager | Tutor |
| `/admin/dashboard` | Admin Dashboard | Admin |
| `/admin/users` | User Management | Admin |
| `/admin/verification` | Tutor Verification | Admin |
| `/admin/reports` | Reports & Moderation | Admin |

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `build/` folder, ready to deploy.

---

## 📄 Figma Prototype

[View Figma Wireframes](https://www.figma.com/design/71IAoogoCQps7AMooDNuzI/Untitled?node-id=0-1)

---

## 📚 Course Info

- **Course:** SWE 363
- **Milestones:** 4 — Front-End Implementation; **5 — Back-End Implementation** (`server/` + API docs above)
