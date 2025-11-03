import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/auth/AdminLogin';
import DoctorLogin from './components/auth/DoctorLogin';
import ReceptionistLogin from './components/auth/ReceptionistLogin';
import AdminDashboard from './components/dashboards/AdminDashboard';
import DoctorDashboard from './components/dashboards/DoctorDashboard';
import ReceptionistDashboard from './components/dashboards/ReceptionistDashboard';
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
