const express = require("express");
const {
  addUser,
  deleteUser,
  getSingleUser,
  getUser,
  updateUser,
} = require("../controller/user.js");
const router = express.Router();

router.get("/users", getUser);
router.post("/users", addUser);
router.get("/users/:id", getSingleUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

module.exports = router;
