import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Contact.scss';

const Contact = () => {
  const { translations } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = translations.contact?.nameRequired || 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = translations.contact?.emailRequired || 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = translations.contact?.emailInvalid || 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = translations.contact?.subjectRequired || 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = translations.contact?.messageRequired || 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = translations.contact?.messageLength || 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Contact form submitted:', formData);
      setSubmitted(true);
      // TODO: Integrate with API
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero fade-in-up">
        <h1 className="contact-title">
          {translations.contact?.title || 'Contact Us'}
        </h1>
        <p className="contact-subtitle">
          {translations.contact?.subtitle || 'Get in touch with our team. We\'re here to help!'}
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info fade-in-up">
          <div className="info-card">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3>{translations.contact?.emailTitle || 'Email'}</h3>
            <p>support@wheelwise.com</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <h3>{translations.contact?.phoneTitle || 'Phone'}</h3>
            <p>+36 1 234 5678</p>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3>{translations.contact?.addressTitle || 'Address'}</h3>
            <p>Budapest, Hungary</p>
          </div>
        </div>

        <div className="contact-form-container fade-in-up">
          {submitted ? (
            <div className="success-message">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <h2>{translations.contact?.successTitle || 'Message Sent!'}</h2>
              <p>{translations.contact?.successMessage || 'Thank you for contacting us. We\'ll get back to you soon.'}</p>
            </div>
          ) : (
            <>
              <h2 className="form-title">
                {translations.contact?.formTitle || 'Send us a Message'}
              </h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{translations.contact?.name || 'Full Name'} *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={translations.contact?.namePlaceholder || 'John Doe'}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">{translations.contact?.email || 'Email Address'} *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={translations.contact?.emailPlaceholder || 'john@example.com'}
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">{translations.contact?.phone || 'Phone Number'}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={translations.contact?.phonePlaceholder || '+36 20 123 4567'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">{translations.contact?.subject || 'Subject'} *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder={translations.contact?.subjectPlaceholder || 'How can we help?'}
                      className={errors.subject ? 'error' : ''}
                    />
                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{translations.contact?.message || 'Message'} *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={translations.contact?.messagePlaceholder || 'Tell us more about your inquiry...'}
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                  {translations.contact?.submitButton || 'Send Message'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
