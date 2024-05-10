import { db } from "../../app.js";
import bcrypt from "bcrypt";
import {
  AccessTokenDecoder,
  AccessTokenGenerator,
  RefreshTokenDecoder,
  RefreshTokenGenerator,
} from "../utils/JWTTokens.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

//register controller
export const userRegistration = (req, res) => {
  const { name, username, password, passwordConfirm } = req.body;

  // if (!(name, username, password, passwordConfirm))
  //   return res.status(409).json("All fields are mandatory");

  if (
    [name, username, password, passwordConfirm].some(
      (field) => field == undefined || field.trim() === ""
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

        //hash password and register user
        const hashedPassword = await bcrypt.hash(password, 8);
        console.log("hashedPassword", hashedPassword);
        db.query(
          "INSERT INTO users SET ?",
          {
            name: name,
            username: username,
            password: hashedPassword,
          },
          (error, results) => {
            if (error) {
              console.log("Could not register user!", error);
            } else {
              return res.status(200).json("User registered successfully.");
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json("Internal server error!");
  }
};

//login controller
export const userLogin = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password || username.trim() === "") {
    return res.status(400).json("Please enter username and password.");
  }

  //check user exists or not, verify password and set cookies
  db.query(
    "SELECT username, password FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.log("Error while fetching data!", error);
      }
      if (results.length > 0) {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          results[0].password
        );

        if (isPasswordCorrect) {
          const accessToken = AccessTokenGenerator(username);
          const refreshToken = RefreshTokenGenerator(username);

          return res
            .status(200)
            .cookie("accessToken", { accessToken }, cookieOptions)
            .cookie("refreshToken", { refreshToken }, cookieOptions)
            .json("Logged in successfully.");
        }
      } else {
        res.status(400).json("User does not exist.");
      }
    }
  );
};

export const userLogout = (req, res) => {
  // db.query("DELETE FROM userToken WHERE token = ?", [username]);
  console.log("logged out", req.username);
  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json("Logged out successfully.");
};

export const refreshExistingTokens = (req, res) => {
  console.log("refresh token username", req.username);
  const newAccessToken = AccessTokenGenerator(req.username);
  res
    .status(200)
    .cookie("accessToken", { accessToken: newAccessToken }, cookieOptions)
    .json("Access token refreshed succefully.");
};

export const viewDashboard = (req, res) => {
  if (!req.username) {
    return res
      .status(401)
      .json("Access denied. Please login to access dashboard.");
  }

  return res.status(200).json(`Welcome to your dashboard ${req.username}`);
};
