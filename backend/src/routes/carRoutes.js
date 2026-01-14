const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const carController = require('../controllers/carController');
const { protect } = require('../middlewares/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'car-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Public routes
router.get('/cars', carController.getAllCars);
router.get('/cars/:id', carController.getCarById);
router.get('/filter-options', carController.getFilterOptions);

// Protected routes (require authentication)
router.post('/cars', protect, upload.array('images', 10), carController.createCar);
router.put('/cars/:id', protect, upload.array('images', 10), carController.updateCar);
router.delete('/cars/:id', protect, carController.deleteCar);
router.get('/my-cars', protect, carController.getMyCars);

module.exports = router;
