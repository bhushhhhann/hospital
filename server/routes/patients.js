const express = require('express');
const { body, validationResult } = require('express-validator');
const { getConnection, closeConnection } = require('../models/db');

const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM PATIENTS');
    await closeConnection(connection);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get patient by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM PATIENTS WHERE PATIENT_ID = :id', [id]);
    await closeConnection(connection);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create patient
router.post('/', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('phone').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, address, dateOfBirth } = req.body;
    const connection = await getConnection();
    // INSERT INTO PATIENTS (NAME, EMAIL, PHONE, ADDRESS, DOB) VALUES (...)
    await closeConnection(connection);
    res.status(201).json({ message: 'Patient created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update patient
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, dateOfBirth } = req.body;
    const connection = await getConnection();
    // UPDATE PATIENTS SET ... WHERE PATIENT_ID = :id
    await closeConnection(connection);
    res.json({ message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete patient
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    // DELETE FROM PATIENTS WHERE PATIENT_ID = :id
    await closeConnection(connection);
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
