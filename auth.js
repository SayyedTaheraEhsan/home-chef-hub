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

// DELETE /delete-account/:id
app.delete('/delete-account/:id', (req, res) => {
    const userId = req.params.id;
  
    const query = "DELETE FROM users WHERE id = ?";
  
    con.query(query, [userId], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database error', details: err });
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found or already deleted' });
      }
  
      res.json({ message: 'Account deleted successfully' });
    });
  });
  