const express = require("express");
const mysql = require("mysql");
const Joi = require("joi");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());

// MySQL connection
const con = mysql.createConnection({
  host: "localhost",
  user: "tahera",
  password: "s.tahera123",
  database: "Home"
});

con.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// Example route to check approval by ID
app.get("/approval/:id", (req, res) => {
  const id = req.params.id;
  const query = "SELECT * FROM approvals WHERE id = ?";

  con.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ message: "Approval not found" });

    res.json({ approval: results[0] });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Submit Feedback
router.post('/', (req, res) => {
    const { approval_id, feedback_text, submitted_by } = req.body;

    const query = 'INSERT INTO feedbacks (approval_id, feedback_text, submitted_by) VALUES (?, ?, ?)';

    db.query(query, [approval_id, feedback_text, submitted_by], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error submitting feedback' });

        res.json({ message: 'Feedback submitted', feedback_id: result.insertId });
    });
});

// Get Feedback for an Approval
router.get('/:approval_id', (req, res) => {
    const approval_id = req.params.approval_id;

    const query = 'SELECT * FROM feedbacks WHERE approval_id = ?';

    db.query(query, [approval_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching feedback' });

        res.json({ feedbacks: results });
    });
});

module.exports = router;
