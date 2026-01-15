import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import './SellCars.scss';

const SellCars = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    bodyType: 'Sedan',
    color: '',
    fuelType: 'Gas',
    kilometers: '',
    transmission: 'Automatic',
    power: '',
    location: '',
    description: '',
    features: '',
    condition: 'Used',
    sellerPhone: '',
    images: []
  });

  const brands = [
    'Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 
    'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Tesla',
    'Volvo', 'Porsche', 'Lexus', 'Jeep', 'Land Rover', 'Jaguar', 'Other'
  ];

  const bodyTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon', 'Van', 'Truck', 'Other'];
  const fuelTypes = ['Gas', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid', 'Other'];
  const transmissions = ['Manual', 'Automatic', 'CVT', 'Semi-Automatic'];
  const conditions = ['New', 'Used', 'Certified Pre-Owned'];
  const colors = [
    'Black', 'White', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 
    'Yellow', 'Orange', 'Brown', 'Gold', 'Beige', 'Purple', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }

    if (files.length === 0) return;

    // Validate file sizes
    const maxSize = 5 * 1024 * 1024; // 5MB
    const invalidFiles = files.filter(file => file.size > maxSize);
    
    if (invalidFiles.length > 0) {
      setError('Each image must be smaller than 5MB');
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: files
    }));

    // Create previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setError('');
  };

  const removeImage = (index) => {
    const newImages = Array.from(formData.images).filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!user) {
      setError('You must be logged in to sell a car');
      setTimeout(() => navigate('/auth'), 2000);
      return;
    }

    if (formData.images.length === 0) {
      setError('Please upload at least one image');
      return;
    }

    if (!formData.brand || !formData.model || !formData.price || !formData.kilometers) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          // Append all images
          formData.images.forEach(image => {
            submitData.append('images', image);
          });
        } else if (key === 'features') {
          // Convert features string to array
          const featuresArray = formData.features
            .split(',')
            .map(f => f.trim())
            .filter(f => f);
          submitData.append('features', JSON.stringify(featuresArray));
        } else {
          submitData.append(key, formData[key]);
        }
      });

      const response = await api.post('/cars', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setSuccess('Car listed successfully! Redirecting...');
        // Reset form
        setFormData({
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          price: '',
          bodyType: 'Sedan',
          color: '',
          fuelType: 'Gas',
          kilometers: '',
          transmission: 'Automatic',
          power: '',
          location: '',
          description: '',
          features: '',
          condition: 'Used',
          sellerPhone: '',
          images: []
        });
        setImagePreviews([]);
        
        // Redirect to car detail page after 2 seconds
        setTimeout(() => {
          navigate(`/car/${response.data.data._id}`);
        }, 2000);
      }
    } catch (err) {
      console.error('Error creating listing:', err);
      setError(err.response?.data?.message || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-cars-page">
      <div className="container">
        <div className="sell-cars-header">
          <h1>Sell Your Car</h1>
          <p>List your vehicle and reach thousands of potential buyers</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="sell-car-form">
          {/* Image Upload Section */}
          <div className="form-section">
            <h2>Photos</h2>
            <p className="section-description">Upload up to 10 photos of your car (Max 5MB each)</p>
            
            <div className="image-upload-container">
              <label htmlFor="images" className="image-upload-label">
                <div className="upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Click to upload images</span>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="image-input"
                />
              </label>

              {imagePreviews.length > 0 && (
                <div className="image-previews">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="image-preview">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-btn"
                      >
                        ×
                      </button>
                      {index === 0 && <span className="primary-badge">Primary</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h2>Basic Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand *</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="model">Model *</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g., Civic, Camry, 3 Series"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year">Year *</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price (€) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 15000"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="kilometers">Kilometers *</label>
                <input
                  type="number"
                  id="kilometers"
                  name="kilometers"
                  value={formData.kilometers}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="condition">Condition *</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="form-section">
            <h2>Technical Specifications</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bodyType">Body Type *</label>
                <select
                  id="bodyType"
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleChange}
                  required
                >
                  {bodyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="color">Color *</label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Color</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fuelType">Fuel Type *</label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  required
                >
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="transmission">Transmission *</label>
                <select
                  id="transmission"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  required
                >
                  {transmissions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="power">Power (HP) *</label>
                <input
                  type="number"
                  id="power"
                  name="power"
                  value={formData.power}
                  onChange={handleChange}
                  placeholder="e.g., 150"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Budapest, Hungary"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="form-section">
            <h2>Additional Details</h2>
            
            <div className="form-group full-width">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your car, its condition, service history, and any other relevant details..."
                rows="5"
                maxLength="2000"
                required
              />
              <span className="char-count">{formData.description.length}/2000</span>
            </div>

            <div className="form-group full-width">
              <label htmlFor="features">Features (comma-separated)</label>
              <input
                type="text"
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="e.g., Leather seats, Navigation, Sunroof, Bluetooth"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h2>Contact Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sellerPhone">Phone Number *</label>
                <input
                  type="tel"
                  id="sellerPhone"
                  name="sellerPhone"
                  value={formData.sellerPhone}
                  onChange={handleChange}
                  placeholder="e.g., +36 20 123 4567"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="disabled-input"
                />
                <small>Email from your account</small>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/buy-cars')}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating Listing...' : 'List Car for Sale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellCars;
