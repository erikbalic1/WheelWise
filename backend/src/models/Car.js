const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear() + 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  bodyType: {
    type: String,
    required: true,
    enum: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck', 'Other']
  },
  color: {
    type: String,
    required: true
  },
  fuelType: {
    type: String,
    required: true,
    enum: ['Gas', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'Other']
  },
  kilometers: {
    type: Number,
    required: true,
    min: 0
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Manual', 'Automatic', 'CVT', 'Semi-Automatic']
  },
  power: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  features: {
    type: [String],
    default: []
  },
  images: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return v.length >= 1 && v.length <= 10;
      },
      message: 'A car must have between 1 and 10 images'
    }
  },
  condition: {
    type: String,
    enum: ['New', 'Used', 'Certified Pre-Owned'],
    default: 'Used'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sellerName: {
    type: String,
    required: true
  },
  sellerEmail: {
    type: String,
    required: true
  },
  sellerPhone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
carSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient searching
carSchema.index({ brand: 1, model: 1, year: -1 });
carSchema.index({ price: 1 });
carSchema.index({ status: 1 });
carSchema.index({ createdAt: -1 });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
