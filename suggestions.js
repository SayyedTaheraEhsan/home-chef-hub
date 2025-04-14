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

// Suggest recipe to HomeChef
router.post('/', (req, res) => {
    const { recipe_id, suggested_to_user_id, suggested_by_user_id = null, note } = req.body;

    if (!recipe_id || !suggested_to_user_id) {
        return res.status(400).json({ error: 'recipe_id and suggested_to_user_id are required' });
    }

    const query = `
        INSERT INTO suggested_recipes (recipe_id, suggested_to_user_id, suggested_by_user_id, note)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [recipe_id, suggested_to_user_id, suggested_by_user_id, note], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        res.status(201).json({ message: 'Recipe suggested to HomeChef', suggestion_id: result.insertId });
    });
});

// Get suggestions for a HomeChef
router.get('/homechef/:user_id', (req, res) => {
    const userId = req.params.user_id;

    const query = `
        SELECT sr.id, sr.status, sr.note, r.title, r.description
        FROM suggested_recipes sr
        JOIN recipes r ON r.id = sr.recipe_id
        WHERE sr.suggested_to_user_id = ?
        ORDER BY sr.created_at DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching suggestions', details: err });

        res.json({ suggestions: results });
    });
});

// Update suggestion status (accept/reject)
router.put('/:id/status', (req, res) => {
    const suggestionId = req.params.id;
    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    const query = 'UPDATE suggested_recipes SET status = ? WHERE id = ?';

    db.query(query, [status, suggestionId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error updating status', details: err });

        res.json({ message: 'Suggestion status updated' });
    });
});

module.exports = router;
