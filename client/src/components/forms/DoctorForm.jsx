import React, { useState } from 'react';
import '../styles/Form.css';

const DoctorForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    contact: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization is required';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ name: '', specialization: '', contact: '' });
    }
  };

  return (
    <div className="form-container">
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="specialization">Specialization *</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className={errors.specialization ? 'input-error' : ''}
            placeholder="e.g., Cardiology, Pediatrics"
          />
          {errors.specialization && <span className="error-message">{errors.specialization}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact *</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className={errors.contact ? 'input-error' : ''}
          />
          {errors.contact && <span className="error-message">{errors.contact}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">Submit</button>
          <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;
