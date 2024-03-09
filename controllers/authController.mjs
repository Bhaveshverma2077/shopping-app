import { User } from "../model/index.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail.js";
import isStrongPassword from "validator/lib/isStrongPassword.js";
import isEmpty from "validator/lib/isEmpty.js";

const authController = async (req, res) => {
  const email = req.body.email.toLowerCase();
  if (!isEmail(email)) {
    res.json(JSON.stringify({ error: "Invalid Email!" }));
    return;
  }
  const password = req.body.password;

  const login = req.body.login;
  let user;
  // Login
  if (login) {
    try {
      user = await User.findOne({ email });
    } catch (error) {
      res.json(JSON.stringify({ error: "Something Went Wrong!" }));
    }
    if (!user) {
      res.json(
        JSON.stringify({
          error: "Account does not exists with the email provided!",
        })
      );
      return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign(JSON.stringify({ email }), process.env.JWT_SECRET);
      res.json(JSON.stringify({ token }));
      return;
    }
    res.json(JSON.stringify({ error: "Password Incorrect!" }));
    return;
  }
  if (user) {
    res.json(
      JSON.stringify({ error: "Account with the email already exists!" })
    );
    return;
  }
  // Sign Up
  const userName = req.body.userName.toLowerCase();
  if (isEmpty(userName)) {
    res.json(
      JSON.stringify({
        error: "Username should not be empty",
      })
    );
    return;
  }
  if (
    !isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
  ) {
    res.json(
      JSON.stringify({
        error:
          "Password Should be at least 8 characters including one number, one uppercase alphabet, one lowercase alphabet and one symbol!",
      })
    );
    return;
  }
  const newUser = new User({
    userName,
    email,
    password: await bcrypt.hash(password, 12),
    cart: [],
    imageUrl: "",
    orders: [],
  });
  try {
    await newUser.save();
    const token = jwt.sign(JSON.stringify({ email }), process.env.JWT_SECRET);
    res.json(JSON.stringify({ token }));
  } catch (error) {
    res.json(JSON.stringify({ error: "Something Went Wrong!" }));
  }
};

export default authController;
