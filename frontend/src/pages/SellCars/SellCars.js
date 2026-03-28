import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import './SellCars.scss';

const SellCars = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { translations } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [myCars, setMyCars] = useState([]);
  const [myCarsLoading, setMyCarsLoading] = useState(false);
  const [myCarsError, setMyCarsError] = useState('');
  const [editingCarId, setEditingCarId] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState('');
  const [editFormData, setEditFormData] = useState({
    brand: '',
    model: '',
    year: '',
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
    sellerPhone: ''
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
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

  const getBackendBaseUrl = () => {
    const normalized = API_URL.replace(/\/$/, '');
    return normalized.endsWith('/api') ? normalized.slice(0, -4) : normalized;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== 'string') {
      return '';
    }

    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${getBackendBaseUrl()}${cleanPath}`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price || 0);
  };

  const loadMyCars = useCallback(async () => {
    if (!user) {
      setMyCars([]);
      setMyCarsError('');
      return;
    }

    setMyCarsLoading(true);
    setMyCarsError('');

    try {
      const response = await api.get('/my-cars');
      if (response.data.success) {
        setMyCars(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching your listings:', err);
      setMyCarsError('Failed to load your listings.');
      setMyCars([]);
    } finally {
      setMyCarsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadMyCars();
  }, [loadMyCars]);

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
      setError(translations.sellCar?.errorMaxImages || 'Maximum 10 images allowed');
      return;
    }

    if (files.length === 0) return;

    // Validate file sizes
    const maxSize = 5 * 1024 * 1024; // 5MB
    const invalidFiles = files.filter(file => file.size > maxSize);
    
    if (invalidFiles.length > 0) {
      setError(translations.sellCar?.errorImageSize || 'Each image must be smaller than 5MB');
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
      setError(translations.sellCar?.errorLogin || 'You must be logged in to sell a car');
      setTimeout(() => navigate('/auth'), 2000);
      return;
    }

    if (formData.images.length === 0) {
      setError(translations.sellCar?.errorUploadImages || 'Please upload at least one image');
      return;
    }

    if (!formData.brand || !formData.model || !formData.price || !formData.kilometers) {
      setError(translations.sellCar?.errorFillRequired || 'Please fill in all required fields');
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
        setSuccess(translations.sellCar?.successMessage || 'Car listed successfully! Redirecting...');
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
        await loadMyCars();
        
        // Redirect to car detail page after 2 seconds
        setTimeout(() => {
          navigate(`/car/${response.data.data._id}`);
        }, 2000);
      }
    } catch (err) {
      console.error('Error creating listing:', err);
      setError(err.response?.data?.message || translations.sellCar?.errorMessage || 'Failed to create listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (car) => {
    setEditingCarId(car._id);
    setEditFormData({
      brand: car.brand || '',
      model: car.model || '',
      year: car.year || '',
      price: car.price || '',
      bodyType: car.bodyType || 'Sedan',
      color: car.color || '',
      fuelType: car.fuelType || 'Gas',
      kilometers: car.kilometers || '',
      transmission: car.transmission || 'Automatic',
      power: car.power || '',
      location: car.location || '',
      description: car.description || '',
      features: Array.isArray(car.features) ? car.features.join(', ') : '',
      condition: car.condition || 'Used',
      sellerPhone: car.sellerPhone || ''
    });
  };

  const cancelEdit = () => {
    setEditingCarId('');
    setEditFormData({
      brand: '',
      model: '',
      year: '',
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
      sellerPhone: ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateListing = async (id) => {
    if (!id) return;

    setEditLoading(true);
    setError('');
    setSuccess('');

    const payload = {
      ...editFormData,
      year: Number(editFormData.year),
      price: Number(editFormData.price),
      kilometers: Number(editFormData.kilometers),
      power: Number(editFormData.power),
      features: editFormData.features
        .split(',')
        .map((feature) => feature.trim())
        .filter((feature) => feature)
    };

    try {
      const response = await api.put(`/cars/${id}`, payload);
      if (response.data.success) {
        setSuccess('Listing updated successfully.');
        setEditingCarId('');
        await loadMyCars();
      }
    } catch (err) {
      console.error('Error updating listing:', err);
      setError(err.response?.data?.message || 'Failed to update listing.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteListing = async (id) => {
    if (!id || !window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    setDeleteLoadingId(id);
    setError('');
    setSuccess('');

    try {
      const response = await api.delete(`/cars/${id}`);
      if (response.data.success) {
        setSuccess('Listing deleted successfully.');
        setMyCars((prev) => prev.filter((car) => car._id !== id));
        if (editingCarId === id) {
          cancelEdit();
        }
      }
    } catch (err) {
      console.error('Error deleting listing:', err);
      setError(err.response?.data?.message || 'Failed to delete listing.');
    } finally {
      setDeleteLoadingId('');
    }
  };

  return (
    <div className="sell-cars-page">
      <div className="container">
        <div className="sell-cars-header">
          <h1>{translations.sellCar?.title || 'Sell Your Car'}</h1>
          <p>{translations.sellCar?.subtitle || 'List your vehicle and reach thousands of potential buyers'}</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="sell-car-form">
          {/* Image Upload Section */}
          <div className="form-section">
            <h2>{translations.sellCar?.photosTitle || 'Photos'}</h2>
            <p className="section-description">{translations.sellCar?.photosDescription || 'Upload up to 10 photos of your car (Max 5MB each)'}</p>
            
            <div className="image-upload-container">
              <label htmlFor="images" className="image-upload-label">
                <div className="upload-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z" stroke="#2c3e50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>{translations.sellCar?.uploadButton || 'Click to upload images'}</span>
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
                      {index === 0 && <span className="primary-badge">{translations.sellCar?.primaryBadge || 'Primary'}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="form-section">
            <h2>{translations.sellCar?.basicInfoTitle || 'Basic Information'}</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">{translations.sellCar?.brandLabel || 'Brand'} *</label>
                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                >
                  <option value="">{translations.sellCar?.selectBrand || 'Select Brand'}</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="model">{translations.sellCar?.modelLabel || 'Model'} *</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder={translations.sellCar?.modelPlaceholder || 'e.g., Civic, Camry, 3 Series'}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="year">{translations.sellCar?.yearLabel || 'Year'} *</label>
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
                <label htmlFor="price">{translations.sellCar?.priceLabel || 'Price (€)'} *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder={translations.sellCar?.pricePlaceholder || 'e.g., 15000'}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="kilometers">{translations.sellCar?.kilometersLabel || 'Kilometers'} *</label>
                <input
                  type="number"
                  id="kilometers"
                  name="kilometers"
                  value={formData.kilometers}
                  onChange={handleChange}
                  placeholder={translations.sellCar?.kilometersPlaceholder || 'e.g., 50000'}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="condition">{translations.sellCar?.conditionLabel || 'Condition'} *</label>
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
            <h2>{translations.sellCar?.technicalSpecsTitle || 'Technical Specifications'}</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bodyType">{translations.sellCar?.bodyTypeLabel || 'Body Type'} *</label>
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
                <label htmlFor="color">{translations.sellCar?.colorLabel || 'Color'} *</label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                >
                  <option value="">{translations.sellCar?.selectColor || 'Select Color'}</option>
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fuelType">{translations.sellCar?.fuelTypeLabel || 'Fuel Type'} *</label>
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
                <label htmlFor="transmission">{translations.sellCar?.transmissionLabel || 'Transmission'} *</label>
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
                <label htmlFor="power">{translations.sellCar?.powerLabel || 'Power (HP)'} *</label>
                <input
                  type="number"
                  id="power"
                  name="power"
                  value={formData.power}
                  onChange={handleChange}
                  placeholder={translations.sellCar?.powerPlaceholder || 'e.g., 150'}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">{translations.sellCar?.locationLabel || 'Location'} *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={translations.sellCar?.locationPlaceholder || 'e.g., Budapest, Hungary'}
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="form-section">
            <h2>{translations.sellCar?.additionalDetailsTitle || 'Additional Details'}</h2>
            
            <div className="form-group full-width">
              <label htmlFor="description">{translations.sellCar?.descriptionLabel || 'Description'} *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={translations.sellCar?.descriptionPlaceholder || 'Describe your car, its condition, service history, and any other relevant details...'}
                rows="5"
                maxLength="2000"
                required
              />
              <span className="char-count">{formData.description.length}/2000</span>
            </div>

            <div className="form-group full-width">
              <label htmlFor="features">{translations.sellCar?.featuresLabel || 'Features (comma-separated)'}</label>
              <input
                type="text"
                id="features"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder={translations.sellCar?.featuresPlaceholder || 'e.g., Leather seats, Navigation, Sunroof, Bluetooth'}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h2>{translations.sellCar?.contactInfoTitle || 'Contact Information'}</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sellerPhone">{translations.sellCar?.phoneLabel || 'Phone Number'} *</label>
                <input
                  type="tel"
                  id="sellerPhone"
                  name="sellerPhone"
                  value={formData.sellerPhone}
                  onChange={handleChange}
                  placeholder={translations.sellCar?.phonePlaceholder || 'e.g., +36 20 123 4567'}
                  required
                />
              </div>

              <div className="form-group">
                <label>{translations.sellCar?.emailLabel || 'Email'}</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="disabled-input"
                />
                <small>{translations.sellCar?.emailNote || 'Email from your account'}</small>
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
              {translations.sellCar?.cancelButton || 'Cancel'}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (translations.sellCar?.submittingButton || 'Creating Listing...') : (translations.sellCar?.submitButton || 'List Car for Sale')}
            </button>
          </div>
        </form>

        <section className="my-listings-section">
          <div className="my-listings-header">
            <h2>Your Published Listings</h2>
            <button type="button" className="btn btn-secondary" onClick={loadMyCars} disabled={myCarsLoading}>
              {myCarsLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {myCarsError && <div className="alert alert-error">{myCarsError}</div>}

          {myCarsLoading ? (
            <div className="my-listings-empty">Loading your listings...</div>
          ) : myCars.length === 0 ? (
            <div className="my-listings-empty">You have not published any car listings yet.</div>
          ) : (
            <div className="my-listings-grid">
              {myCars.map((car) => {
                const isEditing = editingCarId === car._id;
                const coverImage = Array.isArray(car.images) && car.images.length > 0 ? getImageUrl(car.images[0]) : '';

                return (
                  <article key={car._id} className="listing-card">
                    {!isEditing ? (
                      <>
                        <div className="listing-image-wrap">
                          {coverImage ? (
                            <img
                              src={coverImage}
                              alt={`${car.brand} ${car.model}`}
                              className="listing-image"
                            />
                          ) : (
                            <div className="listing-image-placeholder">No image</div>
                          )}
                        </div>
                        <div className="listing-content">
                          <h3>{car.brand} {car.model}</h3>
                          <p className="listing-price">{formatPrice(car.price)}</p>
                          <p className="listing-meta">{car.year} • {car.bodyType} • {car.kilometers?.toLocaleString()} km</p>
                          <div className="listing-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => startEdit(car)}>
                              Edit
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleDeleteListing(car._id)}
                              disabled={deleteLoadingId === car._id}
                            >
                              {deleteLoadingId === car._id ? 'Deleting...' : 'Delete'}
                            </button>
                            <button type="button" className="btn btn-primary" onClick={() => navigate(`/car/${car._id}`)}>
                              View
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="listing-edit-form">
                        <div className="form-row">
                          <div className="form-group">
                            <label>Brand *</label>
                            <input name="brand" value={editFormData.brand} onChange={handleEditChange} required />
                          </div>
                          <div className="form-group">
                            <label>Model *</label>
                            <input name="model" value={editFormData.model} onChange={handleEditChange} required />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Year *</label>
                            <input type="number" name="year" value={editFormData.year} onChange={handleEditChange} required />
                          </div>
                          <div className="form-group">
                            <label>Price *</label>
                            <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} required />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Kilometers *</label>
                            <input type="number" name="kilometers" value={editFormData.kilometers} onChange={handleEditChange} required />
                          </div>
                          <div className="form-group">
                            <label>Power *</label>
                            <input type="number" name="power" value={editFormData.power} onChange={handleEditChange} required />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Body Type *</label>
                            <select name="bodyType" value={editFormData.bodyType} onChange={handleEditChange}>
                              {bodyTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Fuel Type *</label>
                            <select name="fuelType" value={editFormData.fuelType} onChange={handleEditChange}>
                              {fuelTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Transmission *</label>
                            <select name="transmission" value={editFormData.transmission} onChange={handleEditChange}>
                              {transmissions.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Condition *</label>
                            <select name="condition" value={editFormData.condition} onChange={handleEditChange}>
                              {conditions.map((condition) => (
                                <option key={condition} value={condition}>{condition}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label>Color *</label>
                            <select name="color" value={editFormData.color} onChange={handleEditChange}>
                              {colors.map((color) => (
                                <option key={color} value={color}>{color}</option>
                              ))}
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Phone *</label>
                            <input name="sellerPhone" value={editFormData.sellerPhone} onChange={handleEditChange} required />
                          </div>
                        </div>
                        <div className="form-group full-width">
                          <label>Location *</label>
                          <input name="location" value={editFormData.location} onChange={handleEditChange} required />
                        </div>
                        <div className="form-group full-width">
                          <label>Description *</label>
                          <textarea
                            name="description"
                            value={editFormData.description}
                            onChange={handleEditChange}
                            rows="4"
                            maxLength="2000"
                            required
                          />
                        </div>
                        <div className="form-group full-width">
                          <label>Features (comma-separated)</label>
                          <input name="features" value={editFormData.features} onChange={handleEditChange} />
                        </div>
                        <div className="listing-actions">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleUpdateListing(car._id)}
                            disabled={editLoading}
                          >
                            {editLoading ? 'Saving...' : 'Save Changes'}
                          </button>
                          <button type="button" className="btn btn-secondary" onClick={cancelEdit} disabled={editLoading}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SellCars;
