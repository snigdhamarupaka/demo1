import React, { useState } from 'react';
import './UserForm.css';
import API_URL from '../config';

const UserForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      setApiError('');
      
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Form submitted successfully:', data);
          setSubmitted(true);
          
          // Notify parent component to refresh the list
          if (onUserAdded) {
            onUserAdded();
          }
          
          // Reset form after 3 seconds
          setTimeout(() => {
            setFormData({
              name: '',
              mobile: '',
              email: ''
            });
            setSubmitted(false);
          }, 3000);
        } else {
          setApiError(data.message || 'Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setApiError('Unable to connect to server. Please make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">User Registration</h1>
        <p className="form-subtitle">Please fill in your details</p>
        
        {submitted && (
          <div className="success-message">
            ✓ Form submitted successfully and saved to database!
          </div>
        )}

        {apiError && (
          <div className="error-message-box">
            ✕ {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? 'error' : ''}
              placeholder="Enter 10-digit mobile number"
              maxLength="10"
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {formData.name || formData.mobile || formData.email ? (
          <div className="preview">
            <h3>Form Preview:</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Mobile:</strong> {formData.mobile}</p>
            <p><strong>Email:</strong> {formData.email}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserForm;
