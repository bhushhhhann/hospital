import React, { useState } from 'react';
import TableView from '../common/TableView';
import PatientForm from '../forms/PatientForm';
import AppointmentForm from '../forms/AppointmentForm';
import '../../styles/Dashboard.css';

const ReceptionistDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  const handleAddNew = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    if (formType === 'patient') {
      setPatients([...patients, data]);
    } else if (formType === 'appointment') {
      setAppointments([...appointments, data]);
    }
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const renderForm = () => {
    if (formType === 'patient') {
      return <PatientForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
    } else if (formType === 'appointment') {
      return <AppointmentForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Receptionist Dashboard</h1>
        <p>Register Patients and Schedule Appointments</p>
      </header>

      <nav className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
      </nav>

      <div className="dashboard-content">
        {showForm && renderForm()}
        {!showForm && (
          <>
            <div className="action-buttons">
              {activeTab === 'appointments' && (
                <button className="btn-primary" onClick={() => handleAddNew('appointment')}>
                  + Schedule Appointment
                </button>
              )}
              {activeTab === 'patients' && (
                <button className="btn-primary" onClick={() => handleAddNew('patient')}>
                  + Register Patient
                </button>
              )}
            </div>
            {activeTab === 'appointments' && (
              <div>
                <h2>Scheduled Appointments</h2>
                <TableView data={appointments} type="appointments" />
              </div>
            )}
            {activeTab === 'patients' && (
              <div>
                <h2>Registered Patients</h2>
                <TableView data={patients} type="patients" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReceptionistDashboard;
