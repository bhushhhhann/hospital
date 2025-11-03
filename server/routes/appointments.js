const express = require('express');
const { body, validationResult } = require('express-validator');
const { getConnection, closeConnection } = require('../models/db');

const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM APPOINTMENTS');
    await closeConnection(connection);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM APPOINTMENTS WHERE APPOINTMENT_ID = :id', [id]);
    await closeConnection(connection);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create appointment
router.post('/', [
  body('patientId').notEmpty(),
  body('doctorId').notEmpty(),
  body('appointmentDate').isISO8601()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientId, doctorId, appointmentDate, reason, status } = req.body;
    const connection = await getConnection();
    // INSERT INTO APPOINTMENTS (PATIENT_ID, DOCTOR_ID, APPOINTMENT_DATE, REASON, STATUS) VALUES (...)
    await closeConnection(connection);
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update appointment
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorId, appointmentDate, reason, status } = req.body;
    const connection = await getConnection();
    // UPDATE APPOINTMENTS SET ... WHERE APPOINTMENT_ID = :id
    await closeConnection(connection);
    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    // DELETE FROM APPOINTMENTS WHERE APPOINTMENT_ID = :id
    await closeConnection(connection);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
