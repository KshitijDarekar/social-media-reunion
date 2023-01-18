import User from "./../models/userModel.js";
import generateToken from "./../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong " + error);
  }
};

// @desc    Regsiter new user
// @route   POST /api/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({
    $or: [{ email: email }],
  });
  if (userExists) {
    res.status(400);
    throw new Error("Username or Email already exists");
  }

  const user = await User.create({
    email: email,
    password: password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

//logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.send("User logout Route");
  res.json({
    message: "User logout Successfully",
  });
};

// @desc    Auth user & get token
// @route   POST /api/authenticate
// @access  Public
const authenticate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(400);
    throw new Error("Something went wrong " + error);
  }
};

export { login, registerUser, logout, authenticate };
