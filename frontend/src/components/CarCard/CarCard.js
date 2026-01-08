import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './CarCard.scss';

const CarCard = ({ car }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { translations } = useLanguage();
  const navigate = useNavigate();

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
    navigate(`/buy-cars/${car.id}`);
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
          src={car.images[currentImageIndex]} 
          alt={`${car.brand} ${car.model}`}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=Car+Image';
          }}
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
