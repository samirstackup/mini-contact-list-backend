const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/route.js");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

const dataFilePath = path.join(__dirname, "data.json");

let users = [];

try {
  // Read data from the JSON file if it exists
  users = JSON.parse(fs.readFileSync(dataFilePath));
} catch (error) {
  // Handle file read error or initialize users if the file doesn't exist
  users = [];
}
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use("/", userRoutes);

app.listen(port, () => console.log(`Server running on ${port}`));
