const express = require("express");
const db = require("../database/db");

const router = express.Router();

router.get("/callLists", function (req, res) {
  const sqlCallLsQuery = " SELECT * FROM call_lists ";

  db.query(sqlCallLsQuery, function (err, result) {
    if (err) {
      console.log(`The error you are facing: ${err.message}`);
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

module.exports = router;
