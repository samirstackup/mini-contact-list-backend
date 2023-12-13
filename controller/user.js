const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const dataFilePath = "data.json";

let users = [];

try {
  // Read data from the JSON file if it exists
  users = JSON.parse(fs.readFileSync(dataFilePath));
} catch (error) {
  // Handle file read error or initialize users if the file doesn't exist
  users = [];
}

const saveDataToFile = () => {
  fs.writeFileSync(dataFilePath, JSON.stringify(users));
};

const getUser = (req, res) => {
  res.send(users);
};

const addUser = (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuidv4() });
  saveDataToFile();
  res.send("User added");
};

const getSingleUser = (req, res) => {
  const singleUser = users.find((user) => user.id === req.params.id);
  res.send(singleUser);
};

const deleteUser = (req, res) => {
  users = users.filter((user) => user.id !== req.params.id);
  saveDataToFile();
  res.send("Contact deleted successfully");
};

const updateUser = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);

  if (user) {
    user.name = req.body.name;
    user.number = req.body.number;
    user.email = req.body.email;
    saveDataToFile();
    res.send("User updated");
  } else {
    console.error("User not found");

    res.status(404).send("User not found");
  }
};

module.exports = {
  getUser,
  addUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
