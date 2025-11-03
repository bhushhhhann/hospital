const { getConnection, closeConnection } = require('../models/db');

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM DOCTORS ORDER BY DOCTOR_ID');
    await closeConnection(connection);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM DOCTORS WHERE DOCTOR_ID = :id',
      [id]
    );
    await closeConnection(connection);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new doctor
const createDoctor = async (req, res) => {
  try {
    const { name, specialization, email, phone, license } = req.body;
    const connection = await getConnection();
    
    // INSERT statement
    const result = await connection.execute(
      `INSERT INTO DOCTORS (NAME, SPECIALIZATION, EMAIL, PHONE, LICENSE_NUMBER)
       VALUES (:name, :specialization, :email, :phone, :license)
       RETURNING DOCTOR_ID INTO :doctor_id`,
      { name, specialization, email, phone, license, doctor_id: { type: 'NUMBER', dir: 'OUT' } },
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.status(201).json({ success: true, message: 'Doctor created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update doctor
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, email, phone, license } = req.body;
    const connection = await getConnection();
    
    const result = await connection.execute(
      `UPDATE DOCTORS SET NAME = :name, SPECIALIZATION = :specialization,
       EMAIL = :email, PHONE = :phone, LICENSE_NUMBER = :license
       WHERE DOCTOR_ID = :id`,
      { name, specialization, email, phone, license, id },
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.json({ success: true, message: 'Doctor updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    
    await connection.execute(
      'DELETE FROM DOCTORS WHERE DOCTOR_ID = :id',
      [id],
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.json({ success: true, message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
};
