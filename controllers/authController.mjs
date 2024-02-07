import { User } from "../model/index.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authController = async (req, res) => {
  const email = new String(req.body.email).toLowerCase();
  const password = new String(req.body.password).toLowerCase();
  const login = req.body.login;
  if (login) {
    let user;
    try {
      user = await User.findOne({ email });
    } catch (error) {
      res.json(JSON.stringify({ error: "Something Went Wrong!" }));
    }
    if (!user) {
      res.json(
        JSON.stringify({ error: "account does not with the email provided" })
      );
      return;
    }
    console.log(password, user.password);
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      const token = jwt.sign(JSON.stringify({ email }), process.env.JWT_SECRET);
      res.json(JSON.stringify({ token }));
      return;
    }
    res.json(JSON.stringify({ error: "Password Incorrect" }));
    return;
  }
  if (user) {
    res.json(JSON.stringify({ error: "account with the email alredy exists" }));
    return;
  }
  const newUser = new User({ email, password: bcrypt.hash(password, 12) });
  try {
    await newUser.save();
    const token = jwt.sign(JSON.stringify({ email }), "OURLITTESECRET");
    res.json(JSON.stringify({ token }));
  } catch (error) {
    res.json(JSON.stringify({ error: "Something Went Wrong!" }));
  }
};

export default authController;
