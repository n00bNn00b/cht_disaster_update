const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(require("./router/auth"));
app.use(require("./router/service"));

app.get("/", (req, res) => {
  res.send("Arc-ng Server is Running 😎!");
});
app.listen(port, () => {
  console.log("Listening to the port: ", port);
});
