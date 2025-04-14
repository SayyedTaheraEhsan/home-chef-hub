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
  user: "root",
  password: "md181023",
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

// Add to favorites (like)
router.post('/', (req, res) => {
    const { user_id, recipe_id } = req.body;

    if (!user_id || !recipe_id) {
        return res.status(400).json({ error: 'user_id and recipe_id are required' });
    }

    const query = `
        INSERT INTO favorite_recipes (user_id, recipe_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP
    `;

    db.query(query, [user_id, recipe_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        res.json({ message: 'Recipe favorited successfully' });
    });
});

// Remove from favorites (unlike)
router.delete('/', (req, res) => {
    const { user_id, recipe_id } = req.body;

    if (!user_id || !recipe_id) {
        return res.status(400).json({ error: 'user_id and recipe_id are required' });
    }

    const query = `
        DELETE FROM favorite_recipes
        WHERE user_id = ? AND recipe_id = ?
    `;

    db.query(query, [user_id, recipe_id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        res.json({ message: 'Recipe unfavorited successfully' });
    });
});

// Get favorite recipes by user
router.get('/:user_id', (req, res) => {
    const userId = req.params.user_id;

    const query = `
        SELECT r.id, r.title, r.description, r.ingredients
        FROM recipes r
        JOIN favorite_recipes f ON r.id = f.recipe_id
        WHERE f.user_id = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error', details: err });

        res.json({ favorites: results });
    });
});

module.exports = router;
