const mongoose = require("mongoose");
require("dotenv").config();
const DB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(DB)
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log("DB not connected:\n", err));
