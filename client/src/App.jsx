import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/Login/AdminLogin';
import DoctorLogin from './components/Login/DoctorLogin';
import ReceptionistLogin from './components/Login/ReceptionistLogin';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import DoctorDashboard from './components/Dashboard/DoctorDashboard';
import ReceptionistDashboard from './components/Dashboard/ReceptionistDashboard';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-login" replace />} />
        <Route path="/admin-login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        <Route path="/doctor-login" element={<DoctorLogin setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        <Route path="/receptionist-login" element={<ReceptionistLogin setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        
        {isAuthenticated && userRole === 'ADMIN' && (
          <Route path="/admin-dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
        )}
        {isAuthenticated && userRole === 'DOCTOR' && (
          <Route path="/doctor-dashboard" element={<DoctorDashboard onLogout={handleLogout} />} />
        )}
        {isAuthenticated && userRole === 'RECEPTIONIST' && (
          <Route path="/receptionist-dashboard" element={<ReceptionistDashboard onLogout={handleLogout} />} />
        )}
        
        <Route path="*" element={<Navigate to="/admin-login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
