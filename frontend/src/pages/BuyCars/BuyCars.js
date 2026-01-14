import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import CarCard from '../../components/CarCard/CarCard';
import api from '../../services/api';
import './BuyCars.scss';

const BuyCars = () => {
  const { translations } = useLanguage();
  const sectionsRef = useRef([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    brands: [],
    bodyTypes: [],
    fuelTypes: [],
    colors: [],
    transmissions: []
  });
  const [filters, setFilters] = useState({
    brand: 'All',
    bodyType: 'All',
    fuelType: 'All',
    color: 'All',
    transmission: 'All',
    yearFrom: '',
    yearTo: '',
    kmFrom: '',
    kmTo: '',
    priceFrom: '',
    priceTo: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  });

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await api.get('/filter-options');
        if (response.data.success) {
          setFilterOptions({
            brands: ['All', ...response.data.data.brands],
            bodyTypes: ['All', ...response.data.data.bodyTypes],
            fuelTypes: ['All', ...response.data.data.fuelTypes],
            colors: ['All', ...response.data.data.colors],
            transmissions: ['All', ...response.data.data.transmissions]
          });
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };
    
    fetchFilterOptions();
  }, []);

  // Fetch cars whenever filters or search changes
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError('');
      
      try {
        const params = {
          page: pagination.page,
          limit: pagination.limit,
          search: searchQuery
        };

        // Add filters to params
        Object.keys(filters).forEach(key => {
          if (filters[key] && filters[key] !== 'All' && filters[key] !== '') {
            params[key] = filters[key];
          }
        });

        const response = await api.get('/cars', { params });
        
        if (response.data.success) {
          setCars(response.data.data);
          setPagination(prev => ({
            ...prev,
            total: response.data.pagination.total,
            pages: response.data.pagination.pages
          }));
        }
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError('Failed to load cars. Please try again.');
        // Fallback to empty array on error
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchQuery, filters, pagination.page, pagination.limit]);

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
      transmission: 'All',
      yearFrom: '',
      yearTo: '',
      kmFrom: '',
      kmTo: '',
      priceFrom: '',
      priceTo: ''
    });
    setSearchQuery('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCars = cars;

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
                  {filterOptions.brands.map(brand => (
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
                  {filterOptions.bodyTypes.map(type => (
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
                  {filterOptions.fuelTypes.map(type => (
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
                  {filterOptions.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              {/* Transmission Filter */}
              <div className="filter-group">
                <label>{translations.buyCars?.transmissionLabel || 'Transmission'}</label>
                <select 
                  value={filters.transmission} 
                  onChange={(e) => handleFilterChange('transmission', e.target.value)}
                >
                  {filterOptions.transmissions.map(type => (
                    <option key={type} value={type}>{type}</option>
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
            {translations.buyCars?.resultsCount || 'Showing'} <strong>{pagination.total}</strong> {translations.buyCars?.cars || 'cars'}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading cars...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {/* Cars Grid */}
        {!loading && !error && filteredCars.length > 0 && (
          <>
            <div className="cars-grid fade-in-up" ref={(el) => (sectionsRef.current[3] = el)}>
              {filteredCars.map(car => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="pagination-btn"
                >
                  ← Previous
                </button>
                
                <div className="page-numbers">
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`page-number ${pagination.page === i + 1 ? 'active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="pagination-btn"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
        
        {/* No Results */}
        {!loading && !error && filteredCars.length === 0 && (
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
