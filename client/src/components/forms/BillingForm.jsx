import React, { useState } from 'react';
import '../styles/Form.css';

const BillingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    totalAmount: '',
    paymentStatus: 'Pending',
    dateIssued: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId.trim()) {
      newErrors.patientId = 'Patient ID is required';
    }
    if (!formData.totalAmount || formData.totalAmount <= 0) {
      newErrors.totalAmount = 'Valid amount is required';
    }
    if (!formData.paymentStatus) {
      newErrors.paymentStatus = 'Payment Status is required';
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
      setFormData({ 
        patientId: '', 
        totalAmount: '', 
        paymentStatus: 'Pending',
        dateIssued: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Generate Bill</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientId">Patient ID *</label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className={errors.patientId ? 'input-error' : ''}
          />
          {errors.patientId && <span className="error-message">{errors.patientId}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount (Rs.) *</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className={errors.totalAmount ? 'input-error' : ''}
            step="0.01"
            min="0"
          />
          {errors.totalAmount && <span className="error-message">{errors.totalAmount}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="paymentStatus">Payment Status *</label>
          <select
            id="paymentStatus"
            name="paymentStatus"
            value={formData.paymentStatus}
            onChange={handleChange}
            className={errors.paymentStatus ? 'input-error' : ''}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Failed">Failed</option>
          </select>
          {errors.paymentStatus && <span className="error-message">{errors.paymentStatus}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dateIssued">Date Issued</label>
          <input
            type="date"
            id="dateIssued"
            name="dateIssued"
            value={formData.dateIssued}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">Submit</button>
          <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
