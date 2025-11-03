import React, { useState } from 'react';
import TableView from '../common/TableView';
import DoctorForm from '../forms/DoctorForm';
import PatientForm from '../forms/PatientForm';
import AppointmentForm from '../forms/AppointmentForm';
import BillingForm from '../forms/BillingForm';
import '../styles/Dashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleAddNew = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    setTableData([...tableData, data]);
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const renderForm = () => {
    switch (formType) {
      case 'doctor':
        return <DoctorForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
      case 'patient':
        return <PatientForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
      case 'appointment':
        return <AppointmentForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
      case 'billing':
        return <BillingForm onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage Doctors, Patients, Appointments, and Billing</p>
      </header>

      <nav className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
        <button
          className={`tab-button ${activeTab === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveTab('doctors')}
        >
          Doctors
        </button>
        <button
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`tab-button ${activeTab === 'billing' ? 'active' : ''}`}
          onClick={() => setActiveTab('billing')}
        >
          Billing
        </button>
      </nav>

      <div className="dashboard-content">
        {showForm && renderForm()}

        {!showForm && (
          <>
            <div className="action-buttons">
              {activeTab === 'patients' && (
                <button className="btn-primary" onClick={() => handleAddNew('patient')}>
                  + Add Patient
                </button>
              )}
              {activeTab === 'doctors' && (
                <button className="btn-primary" onClick={() => handleAddNew('doctor')}>
                  + Add Doctor
                </button>
              )}
              {activeTab === 'appointments' && (
                <button className="btn-primary" onClick={() => handleAddNew('appointment')}>
                  + Add Appointment
                </button>
              )}
              {activeTab === 'billing' && (
                <button className="btn-primary" onClick={() => handleAddNew('billing')}>
                  + Add Billing
                </button>
              )}
            </div>

            <TableView data={tableData} type={activeTab} />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
