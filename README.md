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

- **React 18** — UI framework
- **React Router v6** — client-side routing
- **Bootstrap 5** — responsive layout & utilities
- **Bootstrap Icons** — icon library
- **Google Fonts** — Plus Jakarta Sans + DM Sans
- **Mock Data** — no backend required

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16 or higher
- npm v8 or higher

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/uniskillswap.git
cd uniskillswap

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at **http://localhost:3000**

---

## 🔑 Demo Accounts

Since this is a front-end prototype with mock data, you can log in with any credentials:

| Role | How to trigger |
|------|----------------|
| **Student** | Any email (e.g. `student@university.edu`) |
| **Tutor** | Email containing "tutor" (e.g. `tutor@university.edu`) |
| **Admin** | Use `/admin/login` route |

---

## 📁 Project Structure

```
src/
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
- **Milestone:** 4 — Front-End Implementation
