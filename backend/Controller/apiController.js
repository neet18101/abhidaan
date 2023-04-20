const express = require("express");
const Router = express();

const userModel = require("../Model/userModel");

// user  login

const user_donar_login = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const type = req.body.user_type;
    const password = req.body.password;

    const donarData = await userModel.find({ email: email });
    // console.log(donarData);
    if (donarData) {
    //   console.log(donarData);
    //   console.log(password);

      const passwordMatch = await userModel.find({ password: password });
      console.log(passwordMatch)
      if (passwordMatch != "") {
        res.status(200).send(passwordMatch);
      } else {
        res.send("Invalid email  & password");
      }

      // const passwordMatch  = await userModel.find()
      //   res.status(200).send(donarData);
    }
  } catch (error) {
    res.send(400).json("data  not found");
  }
};

const RegisterUser = async (req, res) => {
  const { username, phonenumber, email, password, salt_password, user_type } =
    req.body;
  try {
    const preuser = await userModel.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(422).json("this is user is already present");
    } else {
      const adduser = new userModel({
        username,
        phonenumber,
        email,
        password,
        salt_password,
        user_type,
      });

      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(422).json(error);
  }
};

module.exports = { RegisterUser, user_donar_login };
