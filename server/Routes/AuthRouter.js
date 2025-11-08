const { signupValidation,loginValidation } = require('../Middlewares/AuthValidation');
const { signup,login } = require('../Controllers/AuthControllers');
const { getAllUsers, getUserByEmail,getUserByPhone }= require('../Controllers/AuthControllers.js');
const User = require("../Models/User");


const router = require('express').Router();
router.post('/signup', signupValidation,signup);
router.post('/login', loginValidation,login)
router.get('/user/email/:email', getUserByEmail);
router.get('/user/phone/:phone', getUserByPhone);


// get all user 
  router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // બધા data fetch કર
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Database fetch error" });
  }
});

module.exports = router;