const express = require('express');
const { body, validationResult } = require('express-validator');
const { getConnection, closeConnection } = require('../models/db');

const router = express.Router();

// Get all billing records
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM BILLING');
    await closeConnection(connection);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get billing record by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM BILLING WHERE BILLING_ID = :id', [id]);
    await closeConnection(connection);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create billing record
router.post('/', [
  body('patientId').notEmpty(),
  body('amount').isFloat({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientId, appointmentId, amount, description, status } = req.body;
    const connection = await getConnection();
    // INSERT INTO BILLING (PATIENT_ID, APPOINTMENT_ID, AMOUNT, DESCRIPTION, STATUS) VALUES (...)
    await closeConnection(connection);
    res.status(201).json({ message: 'Billing record created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update billing record
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, appointmentId, amount, description, status } = req.body;
    const connection = await getConnection();
    // UPDATE BILLING SET ... WHERE BILLING_ID = :id
    await closeConnection(connection);
    res.json({ message: 'Billing record updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete billing record
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    // DELETE FROM BILLING WHERE BILLING_ID = :id
    await closeConnection(connection);
    res.json({ message: 'Billing record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
