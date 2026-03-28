import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './CarCard.scss';

const CarCard = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { translations } = useLanguage();
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const FALLBACK_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22 viewBox=%220 0 400 300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23ececec%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 fill=%22%23777777%22 font-family=%22Arial%22 font-size=%2222%22%3ENo image available%3C/text%3E%3C/svg%3E';

  const getBackendBaseUrl = () => {
    const normalized = API_URL.replace(/\/$/, '');
    return normalized.endsWith('/api') ? normalized.slice(0, -4) : normalized;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== 'string') {
      return FALLBACK_IMAGE;
    }

    // If it's already a full URL, return as is
    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }

    // Build an absolute URL for local upload paths.
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    // Otherwise, prepend the API URL
    return `${getBackendBaseUrl()}${cleanPath}`;
  };

  const handleImageError = (e) => {
    // Prevent recursive onError loops if fallback cannot be loaded.
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === car.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  const handleViewOffer = () => {
    navigate(`/car/${car._id || car.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="car-card">
      <div className="car-image-container">
        <img 
          src={getImageUrl(car.images[currentImageIndex])} 
          alt={`${car.brand} ${car.model}`}
          onError={handleImageError}
        />
        {car.images.length > 1 && (
          <>
            <button className="image-nav prev" onClick={prevImage}>
              ‹
            </button>
            <button className="image-nav next" onClick={nextImage}>
              ›
            </button>
            <div className="image-indicators">
              {car.images.map((_, index) => (
                <span 
                  key={index} 
                  className={index === currentImageIndex ? 'active' : ''}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="car-info">
        <div className="car-header">
          <h3 className="car-title">{car.brand} {car.model}</h3>
          <span className="car-price">{formatPrice(car.price)}</span>
        </div>
        
        <div className="car-details">
          <div className="detail-item">
            <span className="detail-icon">•</span>
            <span>{car.bodyType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">•</span>
            <span>{car.year}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">•</span>
            <span>{car.fuelType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">•</span>
            <span>{car.kilometers.toLocaleString()} km</span>
          </div>
        </div>

        <button className="btn-view-offer" onClick={handleViewOffer}>
          {translations.buyCars?.viewOffer || 'See the Offer'}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
