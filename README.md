# WheelWise - Car Selling Platform

Browse cars, view detailed specs, and sell your own by creating a profile. Get AI tips on the best car for you, and enjoy a seamless experience with multi-language support, light and dark themes, and multiple currencies—all in one smart car marketplace.

## Technology Stack

### Frontend
- React.js
- SCSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Project Structure

```
WheelWise/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
│
├── backend/           # Node.js backend API
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middlewares/
│   └── package.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Features (Planned)

- User authentication and authorization
- Car listing management (CRUD operations)
- Advanced search and filtering
- Image upload for car listings
- User profiles and dashboards
- AI-powered car recommendations
- Multi-language support
- Light and dark themes
- Multiple currency support
- Responsive design for mobile and desktop

## AI Car Advisor (Groq + Llama)

WheelWise uses a prebuilt hosted Llama model via Groq for car recommendations based on user preferences.

1. Create a Groq account: https://console.groq.com/
2. Generate an API key in the Groq dashboard
3. In `backend/.env`, set:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   GROQ_MODEL=llama-3.1-8b-instant
   ```

The Ask AI page calls `POST /api/ai/recommend` and returns recommended car models with reasons.

## Development Roadmap

- [x] Project structure initialization
- [ ] Database models implementation
- [ ] Authentication system
- [ ] Car listing features
- [ ] Search and filter functionality
- [ ] User interface components
- [ ] Image upload system
- [ ] AI recommendation system
- [ ] Multi-language support
- [ ] Theme system
- [ ] Currency conversion
- [ ] Testing and deployment

## License

This project is private and proprietary.
