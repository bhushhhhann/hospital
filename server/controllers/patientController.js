const { getConnection, closeConnection } = require('../models/db');

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM PATIENTS ORDER BY PATIENT_ID');
    await closeConnection(connection);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get patient by ID
const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM PATIENTS WHERE PATIENT_ID = :id',
      [id]
    );
    await closeConnection(connection);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new patient
const createPatient = async (req, res) => {
  try {
    const { name, email, phone, address, dateOfBirth } = req.body;
    const connection = await getConnection();
    
    const result = await connection.execute(
      `INSERT INTO PATIENTS (NAME, EMAIL, PHONE, ADDRESS, DATE_OF_BIRTH)
       VALUES (:name, :email, :phone, :address, :dateOfBirth)
       RETURNING PATIENT_ID INTO :patient_id`,
      { name, email, phone, address, dateOfBirth, patient_id: { type: 'NUMBER', dir: 'OUT' } },
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.status(201).json({ success: true, message: 'Patient created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update patient
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, dateOfBirth } = req.body;
    const connection = await getConnection();
    
    const result = await connection.execute(
      `UPDATE PATIENTS SET NAME = :name, EMAIL = :email,
       PHONE = :phone, ADDRESS = :address, DATE_OF_BIRTH = :dateOfBirth
       WHERE PATIENT_ID = :id`,
      { name, email, phone, address, dateOfBirth, id },
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.json({ success: true, message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete patient
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    
    await connection.execute(
      'DELETE FROM PATIENTS WHERE PATIENT_ID = :id',
      [id],
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.json({ success: true, message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
};
