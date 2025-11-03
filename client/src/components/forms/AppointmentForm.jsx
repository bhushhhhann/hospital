import React, { useState } from 'react';
import '../styles/Form.css';

const AppointmentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentDate: '',
    timeSlot: '',
    status: 'Scheduled'
  });
  const [errors, setErrors] = useState({});

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.patientId.trim()) {
      newErrors.patientId = 'Patient ID is required';
    }
    if (!formData.doctorId.trim()) {
      newErrors.doctorId = 'Doctor ID is required';
    }
    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment Date is required';
    }
    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Time Slot is required';
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
      setFormData({ patientId: '', doctorId: '', appointmentDate: '', timeSlot: '', status: 'Scheduled' });
    }
  };

  return (
    <div className="form-container">
      <h2>Schedule Appointment</h2>
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
          <label htmlFor="doctorId">Doctor ID *</label>
          <input
            type="text"
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            className={errors.doctorId ? 'input-error' : ''}
          />
          {errors.doctorId && <span className="error-message">{errors.doctorId}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment Date *</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className={errors.appointmentDate ? 'input-error' : ''}
          />
          {errors.appointmentDate && <span className="error-message">{errors.appointmentDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="timeSlot">Time Slot *</label>
          <select
            id="timeSlot"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className={errors.timeSlot ? 'input-error' : ''}
          >
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary">Submit</button>
          <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
