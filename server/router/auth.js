const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
// const fs = require('fs');

require("../db/connection");
const Users = require("../model/userSchema");
const Credentials = require("../model/credentialSchema");
const Tokens = require("../model/tokenSchema");

router.post("/signup", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phone,
    userID,
    password,
    address,
  } = req.body;
  const role = "user";
  if (!firstName || !lastName || !password || !email) {
    return res
      .status(422)
      .json({ error: "Please fillup the required field properly!" });
  }
  try {
    const userIDExist = await Users.findOne({ userID: userID });
    const emailExist = await Users.findOne({ email: email });
    const userIDinCredsExist = await Credentials.findOne({ userID: userID });

    if (userIDExist || emailExist || userIDinCredsExist) {
      return res.status(422).json({ error: "A user already exists!" });
    } else {
      const user = new Users({
        userID,
        firstName,
        middleName,
        lastName,
        email,
        phone,
        role,
        address,
      });
      const credential = new Credentials({
        userID,
        password,
      });
      await user.save();
      await credential.save();
      res.status(201).json({ message: "User registration Successful!" });
    }
  } catch (error) {
    console.log(error);
  }
});

/**
 * Login API
 */
router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please filltup the data!" });
    }
    const emailExist = await Users.findOne({
      email: email,
    });
    if (emailExist) {
      const userID = emailExist.userID;
      const userIDExist = await Credentials.findOne({
        userID: userID,
      });
      if (userIDExist) {
        const isMatched = await bcrypt.compare(password, userIDExist.password);
        token = await userIDExist.generateAuthToken();
        console.log(token);
        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 604800000), //for 7days
        });
        if (!isMatched) {
          res.status(400).json({ error: "Invalid Credentials!" });
        } else {
          res.status(200).json({ message: "Login Successful!", userID });
        }
      } else {
        res.status(400).json({ error: "Invalid Credentials!" });
      }
    } else {
      res.status(404).json({ error: "User not found!" });
    }
  } catch (error) {}
});

// Route to update a user's password
router.put("/changePassword/:userID", async (req, res) => {
  const userID = req.params.userID;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // Find the credentials with the given userID
    const credential = await Credentials.findOne({ userID: userID });

    if (!credential) {
      return res.status(404).json({ error: "User credentials not found" });
    }

    // Check if the old password matches
    const isMatched = await bcrypt.compare(
      currentPassword,
      credential.password
    );

    if (isMatched) {
      // Check if the two new passwords match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "New password does not match!" });
      } else {
        //Hash the new password before storing it in the database
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        console.log(hashedPassword);
        await Credentials.updateOne(
          { userID: userID },
          { password: hashedPassword }
        );
        res.status(200).json({ message: "Password updated successfully" });
      }
    } else {
      return res.status(400).json({ error: "Wrong current password!" });
    }
  } catch (err) {
    // If there's an error, respond with an error message
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Recover password using email verification
router.post("/recoverPassword", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // delete the already existing token for the user
    const token = await Tokens.findOne({ userID: user.userID });
    if (token) {
      await Tokens.deleteOne({ userID: user.userID });
    }

    // Generate a random 5-digit PIN
    const pin = Math.floor(10000 + Math.random() * 90000);

    // Hash the PIN and save it to the database
    const hashedPin = await bcrypt.hash(pin.toString(), 10);
    await Tokens.create({ userID: user.userID, token: hashedPin });

    // Send the PIN to the user's email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: `${process.env.DB_GMAIL}`,
        pass: `${process.env.DB_GMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: process.env.DB_GMAIL,
      to: email,
      subject: "Password Recovery PIN",
      text: `Your recovery PIN is: ${pin}\n\nIt will expire after one hour `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Email could not be sent" });
      } else {
        console.log("Email sent: " + info.response);
        return res
          .status(200)
          .json({ message: "Recovery PIN sent to your email" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Verify PIN for password recovery
router.put("/verifyPin", async (req, res) => {
  const { email, pin, newPassword } = req.body;

  try {
    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Retrieve the hashed PIN from the database
    const token = await Tokens.findOne({ userID: user.userID });

    if (!token) {
      return res.status(404).json({ error: "PIN token not found" });
    }

    // Compare the received PIN with the stored hashed PIN
    const isMatched = await bcrypt.compare(pin.toString(), token.token);

    if (isMatched) {
      // Check if the token is expired
      if (token.createdAt.getTime() + 3600000 < Date.now()) {
        await Tokens.deleteOne({ userID: user.userID });
        return res.status(400).json({ error: "PIN token expired" });
      }

      // Hash the new password before updating it in the database
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await Credentials.updateOne(
        { userID: user.userID },
        { password: hashedPassword }
      );

      // Delete the used PIN token from the database
      await Tokens.deleteOne({ userID: user.userID });

      return res.status(200).json({ message: "Password updated successfully" });
    } else {
      return res.status(400).json({ error: "Invalid PIN" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt", { path: "/" });
  res.status(200).json({ message: "Successfully Logged Out!" });
});

module.exports = router;
