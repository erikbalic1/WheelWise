# WheelWise

WheelWise is a full-stack car marketplace application where users can browse and filter listings, view detailed car pages, create new listings, manage profile settings, and use an AI advisor to get model recommendations.

## Core Features

- Local authentication with JWT
- MFA support (TOTP / Google Authenticator)
- Profile management (name/email/avatar/password)
- Car listing CRUD with image uploads
- Car browsing with filters, search, and pagination
- Car details page with image gallery and specs
- AI car advisor using Groq-hosted Llama models
- Multi-language frontend (EN/HU/DE)
- Light/dark theme support
- Full frontend + backend automated test architecture

## Tech Stack

### Frontend

- React
- React Router
- SCSS
- Axios
- React Testing Library + Jest (CRA test runner)

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- TOTP MFA (`speakeasy` + `qrcode`)
- Tests: Jest + Supertest

## Repository Structure

```
WheelWise/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── tests/
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or cloud)
- Groq API key (for AI advisor)

## Environment Variables

Create `backend/.env` from `backend/.env.example` and set:

```dotenv
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000

# AI Advisor
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant
```

Optional frontend env file (`frontend/.env`):

```dotenv
REACT_APP_API_URL=http://localhost:5000/api
```

## Local Development

### 1) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Run backend

```bash
cd backend
npm run dev
```

### 3) Run frontend

```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000`, backend on `http://localhost:5000` by default.

## Scripts

### Backend

- `npm run dev` – start with nodemon
- `npm start` – start production-like server
- `npm test` – run backend Jest tests

### Frontend

- `npm start` – start React dev server
- `npm run build` – production build
- `npm test` – run frontend tests

## API Overview

### Auth (`/api/auth`)

- `POST /register`
- `POST /login`
- `POST /logout`
- `GET /me` (protected)
- `PUT /profile` (protected)
- `PUT /password` (protected)
- `PUT /avatar` (protected)
- `POST /mfa/setup` (protected)
- `POST /mfa/enable` (protected)
- `POST /mfa/disable` (protected)

### Cars (`/api`)

- `GET /cars`
- `GET /cars/:id`
- `GET /filter-options`
- `POST /cars` (protected, multipart)
- `PUT /cars/:id` (protected, multipart)
- `DELETE /cars/:id` (protected)
- `GET /my-cars` (protected)

### AI (`/api/ai`)

- `POST /recommend`
  - Uses Groq-hosted Llama model
  - Returns recommendation summary + car model suggestions
  - Includes fallback logic if provider fails

## Test Architecture

### Backend tests (`backend/tests`)

- `aiRoutes.test.js`
- `authRoutes.test.js`
- `carRoutes.test.js`

### Frontend tests (`frontend/src`)

- `pages/AskAI/AskAI.test.js`
- `tests/pages/pages.smoke.test.js`
- `tests/context/themeContext.test.js`
- `tests/services/api.test.js`
- `tests/utils/renderWithProviders.js`

## Notes

- Uploaded images are stored under `backend/uploads`.
- This project currently uses local file uploads and JWT stored client-side.
- The project is private/proprietary.
