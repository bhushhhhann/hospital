const { getConnection, closeConnection } = require('../models/db');

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `SELECT a.*, d.NAME as DOCTOR_NAME, p.NAME as PATIENT_NAME
       FROM APPOINTMENTS a
       JOIN DOCTORS d ON a.DOCTOR_ID = d.DOCTOR_ID
       JOIN PATIENTS p ON a.PATIENT_ID = p.PATIENT_ID
       ORDER BY a.APPOINTMENT_ID`
    );
    await closeConnection(connection);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM APPOINTMENTS WHERE APPOINTMENT_ID = :id',
      [id]
    );
    await closeConnection(connection);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create new appointment
const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, reason, status } = req.body;
    const connection = await getConnection();
    
    const result = await connection.execute(
      `INSERT INTO APPOINTMENTS (PATIENT_ID, DOCTOR_ID, APPOINTMENT_DATE, REASON, STATUS)
       VALUES (:patientId, :doctorId, :appointmentDate, :reason, :status)
       RETURNING APPOINTMENT_ID INTO :appointment_id`,
      { patientId, doctorId, appointmentDate, reason, status, appointment_id: { type: 'NUMBER', dir: 'OUT' } },
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.status(201).json({ success: true, message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorId, appointmentDate, reason, status } = req.body;
    const connection = await getConnection();
    
    const result = await connection.execute(
      `UPDATE APPOINTMENTS SET PATIENT_ID = :patientId, DOCTOR_ID = :doctorId,
       APPOINTMENT_DATE = :appointmentDate, REASON = :reason, STATUS = :status
       WHERE APPOINTMENT_ID = :id`,
      { patientId, doctorId, appointmentDate, reason, status, id },
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.json({ success: true, message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    
    await connection.execute(
      'DELETE FROM APPOINTMENTS WHERE APPOINTMENT_ID = :id',
      [id],
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.json({ success: true, message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
