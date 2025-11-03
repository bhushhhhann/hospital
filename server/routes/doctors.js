const express = require('express');
const { body, validationResult } = require('express-validator');
const { getConnection, closeConnection } = require('../models/db');

const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    // SELECT * FROM DOCTORS
    const result = await connection.execute('SELECT * FROM DOCTORS');
    await closeConnection(connection);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get doctor by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.execute('SELECT * FROM DOCTORS WHERE DOCTOR_ID = :id', [id]);
    await closeConnection(connection);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create doctor
router.post('/', [
  body('name').notEmpty(),
  body('specialization').notEmpty(),
  body('email').isEmail()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, specialization, email, phone } = req.body;
    const connection = await getConnection();
    // INSERT INTO DOCTORS (NAME, SPECIALIZATION, EMAIL, PHONE) VALUES (...)
    await closeConnection(connection);
    res.status(201).json({ message: 'Doctor created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update doctor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, email, phone } = req.body;
    const connection = await getConnection();
    // UPDATE DOCTORS SET ... WHERE DOCTOR_ID = :id
    await closeConnection(connection);
    res.json({ message: 'Doctor updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete doctor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    // DELETE FROM DOCTORS WHERE DOCTOR_ID = :id
    await closeConnection(connection);
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
