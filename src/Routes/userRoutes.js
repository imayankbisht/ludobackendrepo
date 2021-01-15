const router = require("express").Router();
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    if (!email || !password || !passwordCheck) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (password.length < 5)
      return res.status(400).json({
        msg: "The password needs to be atleast 5 characters long."
      });
    if (password !== passwordCheck) {
      return res.status(400).json({
        msg: "Enter the same passsword twice for verification."
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        msg: "Account with this email is already exists."
      });
    if (!displayName) displayName = email;
    const salt = await bcrypt.genSalt();
    const passswordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email: email,
      password: passswordHash,
      displayName
    });
    const savedUser = await newUser.save();
    // console.log(savedUser);
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        msg: "No account with this email has been registered"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "Invalid Credentials!"
      });

    res.json({
      user: {
        id: user._id,
        displayName: user.displayName
        // email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;
