import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import CarCard from '../../components/CarCard/CarCard';
import { sampleCars, brands, bodyTypes, fuelTypes, colors } from '../../data/sampleCars';
import './BuyCars.scss';

const BuyCars = () => {
  const { translations } = useLanguage();
  const sectionsRef = useRef([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    brand: 'All',
    bodyType: 'All',
    fuelType: 'All',
    color: 'All',
    yearFrom: '',
    yearTo: '',
    kmFrom: '',
    kmTo: '',
    priceFrom: '',
    priceTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -10px 0px'
      }
    );

    const sections = sectionsRef.current;
    
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      sections.forEach((section) => {
        if (section) observer.observe(section);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      brand: 'All',
      bodyType: 'All',
      fuelType: 'All',
      color: 'All',
      yearFrom: '',
      yearTo: '',
      kmFrom: '',
      kmTo: '',
      priceFrom: '',
      priceTo: ''
    });
    setSearchQuery('');
  };

  const filteredCars = useMemo(() => {
    return sampleCars.filter(car => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        `${car.brand} ${car.model}`.toLowerCase().includes(searchQuery.toLowerCase());

      // Brand filter
      const matchesBrand = filters.brand === 'All' || car.brand === filters.brand;

      // Body type filter
      const matchesBodyType = filters.bodyType === 'All' || car.bodyType === filters.bodyType;

      // Fuel type filter
      const matchesFuelType = filters.fuelType === 'All' || car.fuelType === filters.fuelType;

      // Color filter
      const matchesColor = filters.color === 'All' || car.color === filters.color;

      // Year filter
      const matchesYearFrom = filters.yearFrom === '' || car.year >= parseInt(filters.yearFrom);
      const matchesYearTo = filters.yearTo === '' || car.year <= parseInt(filters.yearTo);

      // Kilometers filter
      const matchesKmFrom = filters.kmFrom === '' || car.kilometers >= parseInt(filters.kmFrom);
      const matchesKmTo = filters.kmTo === '' || car.kilometers <= parseInt(filters.kmTo);

      // Price filter
      const matchesPriceFrom = filters.priceFrom === '' || car.price >= parseInt(filters.priceFrom);
      const matchesPriceTo = filters.priceTo === '' || car.price <= parseInt(filters.priceTo);

      return matchesSearch && matchesBrand && matchesBodyType && matchesFuelType && 
             matchesColor && matchesYearFrom && matchesYearTo && matchesKmFrom && 
             matchesKmTo && matchesPriceFrom && matchesPriceTo;
    });
  }, [searchQuery, filters]);

  return (
    <div className="buy-cars-page">
      <div className="container">
        {/* Header Section */}
        <div className="page-header fade-in-up" ref={(el) => (sectionsRef.current[0] = el)}>
          <h1>{translations.buyCars?.title || 'Browse Cars'}</h1>
          <p>{translations.buyCars?.subtitle || 'Find your perfect car from our collection'}</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="search-filter-bar fade-in-up" ref={(el) => (sectionsRef.current[1] = el)}>
          <div className="search-box">
            <input
              type="text"
              placeholder={translations.buyCars?.searchPlaceholder || 'Search by brand or model...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          
          <button 
            className="btn-toggle-filters"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? '✕' : '☰'} {translations.buyCars?.filters || 'Filters'}
          </button>

          {(searchQuery || Object.values(filters).some(f => f !== '' && f !== 'All')) && (
            <button className="btn-clear-filters" onClick={clearFilters}>
              {translations.buyCars?.clearFilters || 'Clear All'}
            </button>
          )}
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="filters-section">
            <div className="filters-grid">
              {/* Brand Filter */}
              <div className="filter-group">
                <label>{translations.buyCars?.brandLabel || 'Brand'}</label>
                <select 
                  value={filters.brand} 
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              {/* Body Type Filter */}
              <div className="filter-group">
                <label>{translations.buyCars?.bodyTypeLabel || 'Body Type'}</label>
                <select 
                  value={filters.bodyType} 
                  onChange={(e) => handleFilterChange('bodyType', e.target.value)}
                >
                  {bodyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Fuel Type Filter */}
              <div className="filter-group">
                <label>{translations.buyCars?.fuelTypeLabel || 'Fuel Type'}</label>
                <select 
                  value={filters.fuelType} 
                  onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                >
                  {fuelTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Color Filter */}
              <div className="filter-group">
                <label>{translations.buyCars?.colorLabel || 'Color'}</label>
                <select 
                  value={filters.color} 
                  onChange={(e) => handleFilterChange('color', e.target.value)}
                >
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              {/* Year Range */}
              <div className="filter-group range-filter">
                <label>{translations.buyCars?.yearLabel || 'Year'}</label>
                <div className="range-inputs">
                  <input 
                    type="number" 
                    placeholder="From"
                    value={filters.yearFrom}
                    onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                    min="1990"
                    max="2026"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    placeholder="To"
                    value={filters.yearTo}
                    onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                    min="1990"
                    max="2026"
                  />
                </div>
              </div>

              {/* Kilometers Range */}
              <div className="filter-group range-filter">
                <label>{translations.buyCars?.kmLabel || 'Kilometers'}</label>
                <div className="range-inputs">
                  <input 
                    type="number" 
                    placeholder="From"
                    value={filters.kmFrom}
                    onChange={(e) => handleFilterChange('kmFrom', e.target.value)}
                    min="0"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    placeholder="To"
                    value={filters.kmTo}
                    onChange={(e) => handleFilterChange('kmTo', e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group range-filter">
                <label>{translations.buyCars?.priceLabel || 'Price ($)'}</label>
                <div className="range-inputs">
                  <input 
                    type="number" 
                    placeholder="From"
                    value={filters.priceFrom}
                    onChange={(e) => handleFilterChange('priceFrom', e.target.value)}
                    min="0"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    placeholder="To"
                    value={filters.priceTo}
                    onChange={(e) => handleFilterChange('priceTo', e.target.value)}
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="results-info">
          <p>
            {translations.buyCars?.resultsCount || 'Showing'} <strong>{filteredCars.length}</strong> {translations.buyCars?.cars || 'cars'}
          </p>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <div className="cars-grid fade-in-up" ref={(el) => (sectionsRef.current[3] = el)}>
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <span className="no-results-icon">🚗</span>
            <h3>{translations.buyCars?.noResults || 'No cars found'}</h3>
            <p>{translations.buyCars?.noResultsText || 'Try adjusting your filters or search query'}</p>
            <button className="btn-clear" onClick={clearFilters}>
              {translations.buyCars?.clearFilters || 'Clear All Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyCars;
