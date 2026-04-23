require("dotenv").config();
const crypto = require('crypto');
const express = require("express");
const app = express();
const PORT = process.env.IPORT || 5000;
const path = require('path');
const { Pool } = require('pg');
const { body, validationResult } = require('express-validator');

// Timestamp
function timestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').replace('Z', '');
}

// --- Middleware ---
app.use(express.json()); 

const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// --- Views ---
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get('/resources', (req, res) => {
  res.sendFile(path.join(publicDir, 'resources.html'));
});

// --- Postgres pool ---
const pool = new Pool({});

// --- FIX 1, 2, & 3: express-validator rules ---
const resourceValidators = [
  body('action')
    .trim()
    .isIn(['create']).withMessage("action must be 'create'"),

  body('resourceName')
    .trim()
    .isLength({ min: 5, max: 30 }).withMessage('resourceName must be 5-30 characters') // FIXED: Added length validation
    .matches(/^[a-zA-Z0-9äöåÄÖÅ ]+$/).withMessage('Name contains invalid characters'),

  body('resourceDescription')
    .trim()
    .isLength({ min: 10, max: 50 }).withMessage('resourceDescription must be 10-50 characters'),

  body('resourceAvailable')
    .isBoolean().withMessage('resourceAvailable must be boolean')
    .toBoolean(),

  body('resourcePrice')
    .isFloat({ min: 0 }).withMessage('resourcePrice must be a non-negative number')
    .toFloat(),

  body('resourcePriceUnit')
    .trim()
    .isIn(['hour', 'day', 'week', 'month']) // FIXED: Added week and month
    .withMessage("resourcePriceUnit must be 'hour', 'day', 'week', or 'month'"),
];

// POST /api/resources
app.post('/api/resources', resourceValidators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array().map(e => ({ field: e.path, msg: e.msg })),
    });
  }

  let {
    action,
    resourceName,
    resourceDescription,
    resourceAvailable,
    resourcePrice,
    resourcePriceUnit
  } = req.body;

  if (action !== 'create') {
    return res.status(400).json({ ok: false, error: 'Only create is implemented' });
  }

  // FIXED: Removed the line that forced resourceAvailable to false

  try {
    const insertSql = `
      INSERT INTO resources (name, description, available, price, price_unit)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, description, available, price, price_unit, created_at
    `;
    
    // FIXED: Removed crypto hashing on name and removed the *2 on price
    const params = [
      resourceName,        // FIXED: No more hashing
      resourceDescription,
      resourceAvailable,   // FIXED: Correct boolean value
      resourcePrice,       // FIXED: No more doubling the price
      resourcePriceUnit
    ];

    const { rows } = await pool.query(insertSql, params);
    return res.status(201).json({ ok: true, data: rows[0] });
  } catch (err) {
    console.error('DB insert failed:', err);
    return res.status(500).json({ ok: false, error: 'Database error' });
  }
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});