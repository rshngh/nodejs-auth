import { db } from "../../app.js";
import bcrypt from "bcrypt";
import {
  AccessTokenDecoder,
  AccessTokenGenerator,
  RefreshTokenDecoder,
  RefreshTokenGenerator,
} from "../utils/JWTTokens.js";

export const userRegistration = (req, res) => {
  const { name, username, password, passwordConfirm } = req.body;

  if (
    [name, username, password, passwordConfirm].some(
      (field) => field.trim() === ""
    )
  ) {
    return res.status(409).json("All fields are mandatory");
  }

  if (password !== passwordConfirm) {
    return res.status(409).json("Passwords do not match.");
  }

  try {
    //check if user exists
    db.query(
      "SELECT username FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          console.log("Error while fetching data!", error);
        }
        if (results.length > 0) {
          return res.status(409).json("Username already exists.");
        }
      }
    );

    //hash password and register user
    const hashedPassword = async () => {
      return await bcrypt.hash(password, 8);
    };

    db.query(
      "INSERT INTO users SET ?",
      { name: name, username: username, password: hashedPassword },
      (error, results) => {
        if (error) {
          console.log("Could not register user!", error);
        } else {
          return res.status(200).json("User registered successfully.");
        }
      }
    );
  } catch (error) {
    return res.status(500).json("Internal server error!");
  }
};

export const userLogin = (req, res) => {
  res.send("login page");
};
export const userLogout = (req, res) => {
  res.send("logout page");
};
