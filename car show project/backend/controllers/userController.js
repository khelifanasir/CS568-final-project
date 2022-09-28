const Users = require("../model/User");
const bcrypt = require("bcryptjs");

exports.getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await Users.find();
  } catch (error) {
    console.log(error);
  }

  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Users.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists!" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new Users({
    name,
    email,
    password: hashedPassword,
    cars: [],
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(201).json({ user });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Users.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "user does not exist!" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  return res
    .status(200)
    .json({ message: "Login successfull", user: existingUser });
};
