import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import './CarDetail.scss';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/cars/${id}`);
        if (response.data.success) {
          setCar(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching car:', err);
        setError('Failed to load car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${API_URL}${imagePath}`;
  };

  if (loading) {
    return (
      <div className="car-detail-page">
        <div className="container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading car details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="car-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>{translations.carDetail?.notFound || 'Car not found'}</h2>
            <button onClick={() => navigate('/buy-cars')} className="btn-back">
              {translations.carDetail?.backToBrowse || 'Back to Browse'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="car-detail-page">
      <div className="container">
        {/* Back Button */}
        <button onClick={() => navigate('/buy-cars')} className="btn-back">
          ← {translations.carDetail?.backToBrowse || 'Back to Browse'}
        </button>

        {/* Main Content */}
        <div className="detail-content">
          {/* Image Gallery */}
          <div className="gallery-section">
            <div className="main-image">
              <img 
                src={getImageUrl(car.images[currentImageIndex])} 
                alt={`${car.brand} ${car.model}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Car+Image';
                }}
              />
              {car.images.length > 1 && (
                <>
                  <button className="image-nav prev" onClick={prevImage}>‹</button>
                  <button className="image-nav next" onClick={nextImage}>›</button>
                </>
              )}
            </div>
            
            {car.images.length > 1 && (
              <div className="thumbnail-gallery">
                {car.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={getImageUrl(image)} 
                      alt={`${car.brand} ${car.model} - ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Car';
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Car Information */}
          <div className="info-section">
            <div className="car-header">
              <h1>{car.brand} {car.model}</h1>
              <div className="price">{formatPrice(car.price)}</div>
            </div>

            <p className="description">{car.description}</p>

            {/* Key Specifications */}
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">{translations.carDetail?.year || 'Year'}</span>
                <span className="spec-value">{car.year}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{translations.carDetail?.bodyType || 'Body Type'}</span>
                <span className="spec-value">{car.bodyType}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{translations.carDetail?.fuelType || 'Fuel Type'}</span>
                <span className="spec-value">{car.fuelType}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{translations.carDetail?.transmission || 'Transmission'}</span>
                <span className="spec-value">{car.transmission}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{translations.carDetail?.kilometers || 'Kilometers'}</span>
                <span className="spec-value">{car.kilometers.toLocaleString()} km</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{translations.carDetail?.power || 'Power'}</span>
                <span className="spec-value">{car.power} HP</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{translations.carDetail?.color || 'Color'}</span>
                <span className="spec-value">{car.color}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">{translations.carDetail?.location || 'Location'}</span>
                <span className="spec-value">{car.location}</span>
              </div>
            </div>

            {/* Features */}
            <div className="features-section">
              <h3>{translations.carDetail?.features || 'Features'}</h3>
              <div className="features-list">
                {car.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="cta-section">
              <button className="btn-contact">
                {translations.carDetail?.contactSeller || 'Contact Seller'}
              </button>
              <button className="btn-schedule">
                {translations.carDetail?.scheduleTest || 'Schedule Test Drive'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
