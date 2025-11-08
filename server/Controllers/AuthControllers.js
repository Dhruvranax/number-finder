const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const errormsg = "Auth failed, email or password is wrong";

    if (!user) {
      return res.status(401).json({ message: errormsg, success: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: errormsg, success: false });
    }

    const jwttoken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwttoken,
      email,
      name: user.name
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select("name email phone -_id");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getUserByPhone = async (req, res) => {
  try {
    const phone = Number(req.params.phone);
    const user = await User.findOne({ phone }).select("name phone -_id");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { signup, login, getUserByEmail, getUserByPhone };
