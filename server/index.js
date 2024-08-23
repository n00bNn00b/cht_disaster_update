const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const connection = require("./db/connection");

const port = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Arc-ng Server is Running 😎!");
});
app.listen(port, () => {
  console.log("Listening to the port: ", port);
});
