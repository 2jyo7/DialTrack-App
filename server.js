const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./database/db");
const userRoutes = require("./routes/userRoute");
const callListRoutes = require("./routes/callListOfUser");
const callRoutes = require("./routes/callRoute");
const messageRoutes = require("./routes/messageRoute");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes middleware
app.use("/api", userRoutes);
app.use("/api", callRoutes);
app.use("/api", callListRoutes);
app.use("/api", messageRoutes);

//port number
const port = process.env.PORT || 3200;

db.connect();
db.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
  if (err) throw err;

  console.log("The solution is: ", rows[0].solution);
  app.listen(`${port}`, () => {
    console.log(
      `The server is listening on ${port}, after connecting with Mysql`
    );
  });
});
