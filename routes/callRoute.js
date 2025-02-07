const express = require("express");
const db = require("../database/db");

const router = express.Router();

// Create a new call log
router.post("/createCall", (req, res) => {
  const { callerId, receiverId, status, startTime } = req.body;
  const sqlPostQuery =
    "INSERT INTO calls (callerId, receiverId, status, startTime) VALUES (?, ?, ?, ?)";

  db.query(
    sqlPostQuery,
    [callerId, receiverId, status, startTime],
    (err, result) => {
      if (err) {
        console.log(`The error you are facing: ${err.message}`);
        return res
          .status(500)
          .send({ message: "Error creating call", error: err });
      }
      res.send({ message: "Call created successfully", result });
    }
  );
});

// Get all call details
router.get("/getCallLog", (req, res) => {
  const sqlGetQuery = "SELECT * FROM calls;";

  db.query(sqlGetQuery, (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res
        .status(500)
        .send({ message: "Error fetching calls", error: err });
    }
    res.send(result);
  });
});

// Get one call log by id
router.get("/getCallLogById/:id", (req, res) => {
  const { id } = req.params;

  const sqlGetQuery = "SELECT * FROM calls WHERE id = ?;";

  db.query(sqlGetQuery, [id], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res
        .status(500)
        .send({ message: "Error fetching call", error: err });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: "Call not found" });
    }
    res.send(result);
  });
});

// Update a call log
router.put("/updateCallLog/:id", (req, res) => {
  const { id } = req.params;
  const { endTime, status } = req.body;
  const sqlUpdateQuery =
    "UPDATE calls SET endTime = ?, duration = TIMESTAMPDIFF(SECOND, startTime, ?), status = ? WHERE id = ?;";

  db.query(sqlUpdateQuery, [endTime, endTime, status, id], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res
        .status(500)
        .send({ message: "Error updating call", error: err });
    }
    res.send({ message: "Call updated successfully", result });
  });
});

// Delete a call
router.delete("/deleteCall/:id", (req, res) => {
  const { id } = req.params;
  const sqlCheckQuery = "SELECT * FROM calls WHERE id = ?";

  // First, check if the call exists
  db.query(sqlCheckQuery, [id], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res
        .status(500)
        .send({ message: "Error fetching call", error: err });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "Call not found" });
    }

    // Proceed to delete the call if it exists
    const sqlDelQuery = "DELETE FROM calls WHERE id = ?";

    db.query(sqlDelQuery, [id], (err, result) => {
      if (err) {
        console.log(`The error you are facing: ${err.message}`);
        return res
          .status(500)
          .send({ message: "Error deleting call", error: err });
      }
      res.send({ message: "Call deleted successfully", result });
    });
  });
});

module.exports = router;
