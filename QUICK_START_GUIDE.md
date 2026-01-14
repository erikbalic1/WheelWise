# Quick Start Guide - Testing the Car Selling Feature

## Prerequisites
- MongoDB installed and running
- Node.js and npm installed

## Starting the Application

### 1. Start MongoDB
Make sure MongoDB is running on your system.

### 2. Start the Backend Server

Open a terminal in the backend directory:
```bash
cd backend
npm run dev
```

The backend server should start on `http://localhost:5000`

### 3. Start the Frontend Server

Open another terminal in the frontend directory:
```bash
cd frontend
npm start
```

The frontend should open automatically at `http://localhost:3000`

## Testing the Car Selling Feature

### Step 1: Register/Login
1. Go to `http://localhost:3000/auth`
2. Create a new account or login with existing credentials
3. You must be logged in to sell cars

### Step 2: Navigate to Sell Cars
1. Click on "Sell Cars" in the navigation menu
2. You'll see the comprehensive car listing form

### Step 3: Fill Out the Form

#### Photos (Required)
- Click "Click to upload images"
- Select 1-10 images (max 5MB each)
- Supported formats: JPG, PNG, GIF, WebP
- The first image will be the primary listing photo
- You can remove images by clicking the × button

#### Basic Information
- **Brand**: Select from dropdown (BMW, Audi, Mercedes, etc.)
- **Model**: Enter the model name (e.g., "320i", "A4")
- **Year**: Enter the year (1900 - 2027)
- **Price**: Enter price in Euros
- **Kilometers**: Enter mileage
- **Condition**: New, Used, or Certified Pre-Owned

#### Technical Specifications
- **Body Type**: Sedan, SUV, Hatchback, etc.
- **Color**: Select from dropdown
- **Fuel Type**: Gas, Diesel, Electric, Hybrid, etc.
- **Transmission**: Manual, Automatic, CVT, Semi-Automatic
- **Power (HP)**: Engine power in horsepower
- **Location**: City and country (e.g., "Budapest, Hungary")

#### Additional Details
- **Description**: Detailed description (required, max 2000 chars)
- **Features**: Comma-separated list (e.g., "Leather seats, Navigation, Sunroof")

#### Contact Information
- **Phone Number**: Your contact number (required)
- **Email**: Automatically filled from your account

### Step 4: Submit the Listing
1. Click "List Car for Sale"
2. Wait for the upload to complete
3. You'll be redirected to the car detail page

### Step 5: Browse Cars
1. Go to "Buy Cars" in the navigation
2. You'll see all listed cars, including your new listing
3. Use the search bar to find specific cars
4. Click "Filters" to show advanced filtering:
   - Filter by brand, body type, fuel type, color, transmission
   - Set year range, kilometer range, price range
5. Click on any car to view full details

### Step 6: View Car Details
1. Click on a car card
2. You'll see:
   - Image gallery with all uploaded photos
   - Full car specifications
   - Seller contact information
   - Location and all other details

## Example Test Data

Here's an example car listing you can create for testing:

```
Photos: Upload 3-5 photos of any car
Brand: BMW
Model: 320i
Year: 2020
Price: 28500
Kilometers: 45000
Condition: Used
Body Type: Sedan
Color: Black
Fuel Type: Gas
Transmission: Automatic
Power: 184
Location: Budapest, Hungary
Description: Well-maintained BMW 320i with full service history. The car has been regularly serviced at authorized BMW service centers. All features are working perfectly. Non-smoking owner. Ready for immediate sale.
Features: Leather seats, Navigation, Bluetooth, Backup camera, Cruise control, Parking sensors
Phone: +36 20 123 4567
```

## API Testing with Postman/Curl

### Get All Cars
```bash
curl http://localhost:5000/api/cars
```

### Get Filter Options
```bash
curl http://localhost:5000/api/filter-options
```

### Get Single Car
```bash
curl http://localhost:5000/api/cars/[CAR_ID]
```

### Create Car (requires authentication)
```bash
curl -X POST http://localhost:5000/api/cars \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "brand=BMW" \
  -F "model=320i" \
  -F "year=2020" \
  -F "price=28500" \
  -F "kilometers=45000" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
  # ... other fields
```

## Troubleshooting

### "You must be logged in to sell a car"
- Make sure you're logged in
- Check that your JWT token is valid
- Try logging out and logging back in

### Images not uploading
- Check file size (max 5MB per image)
- Verify file format (JPG, PNG, GIF, WebP only)
- Try with fewer images first
- Check browser console for errors

### Backend errors
- Check that MongoDB is running
- Verify environment variables in backend/.env
- Check backend terminal for error messages
- Make sure uploads directory exists in backend/

### Frontend errors
- Check that REACT_APP_API_URL is set correctly
- Clear browser cache and reload
- Check browser console for errors
- Verify backend is running on port 5000

## Features to Test

✅ **Upload Multiple Photos**
- Test with 1 image
- Test with 10 images (maximum)
- Test with images larger than 5MB (should fail)

✅ **Form Validation**
- Try submitting without images (should fail)
- Try submitting without required fields (should fail)
- Test character limit on description (2000 chars)

✅ **Search and Filter**
- Search by brand name
- Search by model name
- Filter by multiple criteria
- Clear filters

✅ **Pagination**
- List more than 12 cars to see pagination
- Navigate between pages

✅ **Image Gallery**
- View all uploaded images
- Navigate through thumbnails
- Use next/previous buttons

✅ **Responsive Design**
- Test on mobile devices
- Test on tablets
- Test on desktop

## Next Steps

After testing the basic functionality, you can:
1. Add user profile page to manage listings
2. Implement edit/delete functionality for your own listings
3. Add favorites/wishlist feature
4. Implement messaging between buyers and sellers
5. Add email notifications
6. Integrate payment system
7. Add car comparison feature

## Support

If you encounter any issues:
1. Check the error messages in browser console
2. Check backend terminal for errors
3. Review the API documentation in CAR_SELLING_FEATURE_README.md
4. Verify all environment variables are set correctly
5. Make sure all dependencies are installed
