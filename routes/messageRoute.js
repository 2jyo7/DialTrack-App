const express = require("express");
const db = require("../database/db");

const router = express.Router();

// Create a new message
router.post("/createMessage", (req, res) => {
  const { callId, senderId, receiverId, messageText } = req.body;
  const sqlPostQuery =
    "INSERT INTO messages (callId, senderId, receiverId, messageText) VALUES (?, ?, ?, ?)";

  db.query(
    sqlPostQuery,
    [callId, senderId, receiverId, messageText],
    (err, result) => {
      if (err) {
        console.log(`The error you are facing: ${err.message}`);
        return res
          .status(500)
          .send({ message: "Error creating message", error: err });
      }
      res.send({ message: "Message created successfully", result });
    }
  );
});

// Get all messages for a specific call
router.get("/getAllMsgs/:callId", (req, res) => {
  const { callId } = req.params; // Capture callId from the URL parameter
  const sqlGetQuery = "SELECT * FROM messages WHERE callId = ?;";

  db.query(sqlGetQuery, [callId], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res
        .status(500)
        .send({ message: "Error fetching messages", error: err });
    }
    res.send(result);
  });
});

// Get one message by id
router.get("/getMsgById/:id", (req, res) => {
  const { id } = req.params;

  const sqlGetQuery = "SELECT * FROM messages WHERE id = ?;";

  db.query(sqlGetQuery, [id], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res
        .status(500)
        .send({ message: "Error fetching message", error: err });
    }
    if (result.length === 0) {
      return res.status(404).send({ message: "Message not found" });
    }
    res.send(result);
  });
});

// Update a message
router.put("/updateMessages/:id", (req, res) => {
  const { id } = req.params;
  const { messageText } = req.body;
  const sqlUpdateQuery = "UPDATE messages SET messageText = ? WHERE id = ?;";

  db.query(sqlUpdateQuery, [messageText, id], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res
        .status(500)
        .send({ message: "Error updating message", error: err });
    }
    res.send({ message: "Message updated successfully", result });
  });
});

// Delete a message
router.delete("/deleteMessage/:id", (req, res) => {
  const { id } = req.params;
  const sqlCheckQuery = "SELECT * FROM messages WHERE id = ?";

  // First, check if the message exists
  db.query(sqlCheckQuery, [id], (err, result) => {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res
        .status(500)
        .send({ message: "Error fetching message", error: err });
    }

    if (result.length === 0) {
      return res.status(404).send({ message: "Message not found" });
    }

    // Proceed to delete the message if it exists
    const sqlDelQuery = "DELETE FROM messages WHERE id = ?";

    db.query(sqlDelQuery, [id], (err, result) => {
      if (err) {
        console.log(`The error you are facing: ${err.message}`);
        return res
          .status(500)
          .send({ message: "Error deleting message", error: err });
      }
      res.send({ message: "Message deleted successfully", result });
    });
  });
});

module.exports = router;
