const Car = require('../models/Car');
const fs = require('fs');
const path = require('path');

// Get all cars with filters
exports.getAllCars = async (req, res) => {
  try {
    const {
      brand,
      bodyType,
      fuelType,
      color,
      yearFrom,
      yearTo,
      kmFrom,
      kmTo,
      priceFrom,
      priceTo,
      transmission,
      condition,
      search,
      sortBy = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    const filter = { status: 'available' };

    if (brand && brand !== 'All') filter.brand = brand;
    if (bodyType && bodyType !== 'All') filter.bodyType = bodyType;
    if (fuelType && fuelType !== 'All') filter.fuelType = fuelType;
    if (color && color !== 'All') filter.color = color;
    if (transmission && transmission !== 'All') filter.transmission = transmission;
    if (condition && condition !== 'All') filter.condition = condition;

    // Range filters
    if (yearFrom || yearTo) {
      filter.year = {};
      if (yearFrom) filter.year.$gte = parseInt(yearFrom);
      if (yearTo) filter.year.$lte = parseInt(yearTo);
    }

    if (kmFrom || kmTo) {
      filter.kilometers = {};
      if (kmFrom) filter.kilometers.$gte = parseInt(kmFrom);
      if (kmTo) filter.kilometers.$lte = parseInt(kmTo);
    }

    if (priceFrom || priceTo) {
      filter.price = {};
      if (priceFrom) filter.price.$gte = parseInt(priceFrom);
      if (priceTo) filter.price.$lte = parseInt(priceTo);
    }

    // Search query
    if (search) {
      filter.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { model: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = { [sortBy]: sortOrder };

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const cars = await Car.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Car.countDocuments(filter);

    res.json({
      success: true,
      data: cars,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cars',
      error: error.message
    });
  }
};

// Get single car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Increment views
    car.views += 1;
    await car.save();

    res.json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching car',
      error: error.message
    });
  }
};

// Create new car listing
exports.createCar = async (req, res) => {
  try {
    // Validate user is authenticated
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'You must be logged in to create a listing'
      });
    }

    // Get image paths from uploaded files
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    if (images.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    // Create car object
    const carData = {
      ...req.body,
      images,
      seller: req.user._id,
      sellerName: req.user.name,
      sellerEmail: req.user.email
    };

    // Parse features if it's a string
    if (typeof carData.features === 'string') {
      try {
        carData.features = JSON.parse(carData.features);
      } catch (e) {
        carData.features = carData.features.split(',').map(f => f.trim());
      }
    }

    const car = new Car(carData);
    await car.save();

    res.status(201).json({
      success: true,
      message: 'Car listing created successfully',
      data: car
    });
  } catch (error) {
    console.error('Error creating car:', error);
    
    // Delete uploaded files if car creation fails
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, err => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating car listing',
      error: error.message
    });
  }
};

// Update car listing
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Check if user is the owner
    if (car.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this listing'
      });
    }

    // Handle new images
    if (req.files && req.files.length > 0) {
      // Delete old images
      car.images.forEach(imagePath => {
        const fullPath = path.join(__dirname, '../../', imagePath);
        fs.unlink(fullPath, err => {
          if (err) console.error('Error deleting old image:', err);
        });
      });

      // Add new images
      req.body.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Parse features if it's a string
    if (req.body.features && typeof req.body.features === 'string') {
      try {
        req.body.features = JSON.parse(req.body.features);
      } catch (e) {
        req.body.features = req.body.features.split(',').map(f => f.trim());
      }
    }

    // Update car
    Object.assign(car, req.body);
    await car.save();

    res.json({
      success: true,
      message: 'Car listing updated successfully',
      data: car
    });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating car listing',
      error: error.message
    });
  }
};

// Delete car listing
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }

    // Check if user is the owner
    if (car.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this listing'
      });
    }

    // Delete images
    car.images.forEach(imagePath => {
      const fullPath = path.join(__dirname, '../../', imagePath);
      fs.unlink(fullPath, err => {
        if (err) console.error('Error deleting image:', err);
      });
    });

    await car.deleteOne();

    res.json({
      success: true,
      message: 'Car listing deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting car listing',
      error: error.message
    });
  }
};

// Get cars by current user
exports.getMyCars = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'You must be logged in'
      });
    }

    const cars = await Car.find({ seller: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: cars
    });
  } catch (error) {
    console.error('Error fetching user cars:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching your car listings',
      error: error.message
    });
  }
};

// Get filter options (brands, colors, etc.)
exports.getFilterOptions = async (req, res) => {
  try {
    const brands = await Car.distinct('brand');
    const colors = await Car.distinct('color');
    const bodyTypes = await Car.distinct('bodyType');
    const fuelTypes = await Car.distinct('fuelType');
    const transmissions = await Car.distinct('transmission');

    res.json({
      success: true,
      data: {
        brands: brands.sort(),
        colors: colors.sort(),
        bodyTypes: bodyTypes.sort(),
        fuelTypes: fuelTypes.sort(),
        transmissions: transmissions.sort()
      }
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
};
