const { getConnection, closeConnection } = require('../models/db');

// Get all billing records
const getAllBillingRecords = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute(
      `SELECT b.*, p.NAME as PATIENT_NAME, a.APPOINTMENT_DATE
       FROM BILLING b
       JOIN PATIENTS p ON b.PATIENT_ID = p.PATIENT_ID
       JOIN APPOINTMENTS a ON b.APPOINTMENT_ID = a.APPOINTMENT_ID
       ORDER BY b.BILLING_ID DESC`
    );
    await closeConnection(connection);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get billing record by ID
const getBillingRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM BILLING WHERE BILLING_ID = :id',
      [id]
    );
    await closeConnection(connection);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Billing record not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create billing record
const createBillingRecord = async (req, res) => {
  try {
    const { patientId, appointmentId, amount, description, status } = req.body;
    
    if (!patientId || !amount) {
      return res.status(400).json({ success: false, message: 'Patient ID and amount are required' });
    }
    
    const connection = await getConnection();
    
    const result = await connection.execute(
      `INSERT INTO BILLING (PATIENT_ID, APPOINTMENT_ID, AMOUNT, DESCRIPTION, STATUS)
       VALUES (:patientId, :appointmentId, :amount, :description, :status)
       RETURNING BILLING_ID INTO :billing_id`,
      { patientId, appointmentId, amount, description, status, billing_id: { type: 'NUMBER', dir: 'OUT' } },
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.status(201).json({ success: true, message: 'Billing record created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update billing record
const updateBillingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, appointmentId, amount, description, status } = req.body;
    const connection = await getConnection();
    
    const result = await connection.execute(
      `UPDATE BILLING SET PATIENT_ID = :patientId, APPOINTMENT_ID = :appointmentId,
       AMOUNT = :amount, DESCRIPTION = :description, STATUS = :status
       WHERE BILLING_ID = :id`,
      { patientId, appointmentId, amount, description, status, id },
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.json({ success: true, message: 'Billing record updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete billing record
const deleteBillingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    
    await connection.execute(
      'DELETE FROM BILLING WHERE BILLING_ID = :id',
      [id],
      { autoCommit: true }
    );
    
    await closeConnection(connection);
    res.json({ success: true, message: 'Billing record deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get billing summary
const getBillingSummary = async (req, res) => {
  try {
    const { patientId } = req.params;
    const connection = await getConnection();
    
    const result = await connection.execute(
      `SELECT SUM(AMOUNT) as TOTAL_AMOUNT, COUNT(*) as TOTAL_RECORDS
       FROM BILLING
       WHERE PATIENT_ID = :patientId`,
      [patientId]
    );
    
    await closeConnection(connection);
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllBillingRecords,
  getBillingRecordById,
  createBillingRecord,
  updateBillingRecord,
  deleteBillingRecord,
  getBillingSummary
};
