const express = require("express");
const db = require("../database/db");

const router = express.Router();

// Welcome route
router.get("/", (req, res) => {
  res.send("Welcome to the Dial Track app.");
});

// Create a new user
router.post("/createUser", (req, res) => {
  const { name, phNumber } = req.body;
  const sqlPostQuery = "INSERT INTO users (name, phoneNumber) VALUES (?, ?)";

  db.query(sqlPostQuery, [name, phNumber], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// Get all users
router.get("/getUser", (req, res) => {
  const sqlGetQuery = "SELECT * FROM users";

  db.query(sqlGetQuery, (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// Update a user
router.put("/updateUser/:id", (req, res) => {
  const { id } = req.params;
  const { name, phNumber } = req.body;
  const sqlUpdateQuery =
    "UPDATE users SET name = ?, phoneNumber = ? WHERE id = ?";

  db.query(sqlUpdateQuery, [name, phNumber, id], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// Delete a user
router.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelQuery = "DELETE FROM users WHERE id = ?";

  db.query(sqlDelQuery, [id], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

module.exports = router;
