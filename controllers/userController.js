const userModel = require("../models/userModel")

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {

  console.log("in register")
  console.log(req.body)
  try {
    const newUser = new userModel(req.body);
    await newUser.save();
    console.log("in try block")
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };