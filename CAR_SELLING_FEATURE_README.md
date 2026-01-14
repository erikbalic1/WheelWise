# Car Selling Feature - Setup and Usage Guide

## Overview
This is a full-featured car marketplace where users can upload cars for sale with photos, detailed information, and filtering capabilities.

## Features Implemented

### Backend
- **Car Model** (`backend/src/models/Car.js`)
  - Comprehensive schema with all car details
  - Image storage support
  - Seller information tracking
  - Status management (available, sold, pending)

- **Car Controller** (`backend/src/controllers/carController.js`)
  - Create new car listings with photo upload
  - Get all cars with advanced filtering
  - Get single car details
  - Update and delete listings
  - Get user's own listings
  - Dynamic filter options

- **Car Routes** (`backend/src/routes/carRoutes.js`)
  - File upload with Multer (up to 10 images, max 5MB each)
  - Protected routes requiring authentication
  - Public browsing routes

- **File Storage**
  - Images stored in `backend/uploads/` directory
  - Served as static files via Express

### Frontend
- **Sell Cars Page** (`frontend/src/pages/SellCars/`)
  - Comprehensive form with all car details
  - Photo upload with preview
  - Drag and drop support
  - Real-time validation
  - Success/error feedback

- **Buy Cars Page** (`frontend/src/pages/BuyCars/`)
  - Fetches real data from API
  - Advanced filtering system
  - Search functionality
  - Pagination support
  - Loading and error states

- **Car Detail Page** (`frontend/src/pages/CarDetail/`)
  - Full car information display
  - Image gallery with thumbnails
  - Contact seller information
  - API integration

- **Car Card Component** (`frontend/src/components/CarCard/`)
  - Updated to handle API image paths
  - Works with both sample and real data

## API Endpoints

### Public Endpoints
- `GET /api/cars` - Get all cars with filters
  - Query params: brand, bodyType, fuelType, color, yearFrom, yearTo, kmFrom, kmTo, priceFrom, priceTo, transmission, condition, search, sortBy, order, page, limit
- `GET /api/cars/:id` - Get single car details
- `GET /api/filter-options` - Get available filter options (brands, colors, etc.)

### Protected Endpoints (Require Authentication)
- `POST /api/cars` - Create new car listing (with file upload)
- `PUT /api/cars/:id` - Update car listing
- `DELETE /api/cars/:id` - Delete car listing
- `GET /api/my-cars` - Get current user's listings

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Make sure you have a `.env` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Make sure you have a `.env` file with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

## How to Use

### Selling a Car
1. **Login/Register**: Users must be authenticated to sell cars
2. **Navigate to Sell Cars**: Click "Sell Cars" in the navigation
3. **Fill Out the Form**:
   - Upload 1-10 photos (required, max 5MB each)
   - Enter brand, model, year, price
   - Provide kilometers, condition
   - Select body type, color, fuel type, transmission
   - Enter power (HP) and location
   - Write a detailed description
   - Add features (comma-separated)
   - Provide phone number
4. **Submit**: Click "List Car for Sale"
5. **Confirmation**: You'll be redirected to the car detail page

### Browsing Cars
1. **Navigate to Buy Cars**: Click "Buy Cars" in the navigation
2. **Search**: Use the search bar to find specific brands/models
3. **Filter**: Click "Filters" to show advanced filtering options:
   - Brand, body type, fuel type, color, transmission
   - Year range, kilometer range, price range
4. **View Details**: Click on any car card to see full details
5. **Contact Seller**: Use the contact information on the detail page

### Managing Your Listings
1. **View Your Cars**: Use the `/api/my-cars` endpoint or implement a profile page
2. **Edit Listings**: Use the edit functionality (requires implementation in UI)
3. **Delete Listings**: Use the delete functionality (requires implementation in UI)

## Image Upload Details
- **Supported formats**: JPEG, JPG, PNG, GIF, WebP
- **Maximum size**: 5MB per image
- **Maximum count**: 10 images per listing
- **Storage**: Images are stored in `backend/uploads/`
- **Access**: Images are served at `http://localhost:5000/uploads/[filename]`

## Filter Options
The system supports filtering by:
- **Brand**: All available car brands in the database
- **Body Type**: Sedan, SUV, Hatchback, Coupe, Convertible, Wagon, Van, Truck, Other
- **Fuel Type**: Gas, Diesel, Electric, Hybrid, Plug-in Hybrid, Other
- **Color**: All available colors in the database
- **Transmission**: Manual, Automatic, CVT, Semi-Automatic
- **Year**: Range from-to
- **Kilometers**: Range from-to
- **Price**: Range from-to
- **Condition**: New, Used, Certified Pre-Owned

## Data Validation
- Required fields are validated on both frontend and backend
- Image file types and sizes are validated
- Price, year, kilometers must be positive numbers
- Year must be between 1900 and current year + 1

## Security Features
- Authentication required for creating/editing/deleting listings
- Users can only modify their own listings
- File upload validation (type and size)
- XSS protection through React's built-in escaping
- CORS configuration for API access

## Future Enhancements
- Add favorites/wishlist functionality
- Implement user profile with listing management
- Add messaging system between buyers and sellers
- Implement car comparison feature
- Add advanced search with saved filters
- Email notifications for new listings
- Image optimization and compression
- Social sharing functionality
- Car history reports integration
- Location-based search with maps

## Troubleshooting

### Images not displaying
- Check that backend server is running
- Verify `REACT_APP_API_URL` in frontend .env
- Check browser console for CORS errors
- Ensure uploads directory exists and is writable

### Upload fails
- Check file size (max 5MB)
- Verify file format (only images allowed)
- Check server logs for errors
- Ensure user is authenticated

### Filters not working
- Check API endpoint is responding
- Verify filter parameters in network tab
- Check for console errors
- Ensure database has data to filter

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer
- **Frontend**: React, React Router, Axios, SCSS
- **Authentication**: JWT (existing auth system)
- **File Upload**: Multer with disk storage
- **Styling**: SCSS with CSS variables for theming
