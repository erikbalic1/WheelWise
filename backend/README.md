# WheelWise Backend

Backend API for the WheelWise car selling platform.

## Technology Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration

4. Start the development server:
```bash
npm run dev
```

## Project Structure
```
backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middlewares/   # Custom middlewares
│   └── server.js      # Entry point
├── .env.example
├── .gitignore
└── package.json
```
