import React, { useState } from 'react';
import TableView from '../common/TableView';
import '../../styles/Dashboard.css';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Doctor Dashboard</h1>
        <p>View and Manage Your Appointments</p>
      </header>

      <nav className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          My Appointments
        </button>
        <button
          className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
        </button>
      </nav>

      <div className="dashboard-content">
        {activeTab === 'appointments' && (
          <div>
            <h2>Your Appointments</h2>
            <TableView data={appointments} type="appointments" />
          </div>
        )}
        {activeTab === 'patients' && (
          <div>
            <h2>Patient Records</h2>
            <TableView data={patients} type="patients" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
