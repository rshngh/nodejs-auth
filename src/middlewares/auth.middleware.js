import { db } from "../../app.js";
import { AccessTokenDecoder } from "../utils/JWTTokens.js";

export const verifyToken = (req, res, next) => {
  const { accessToken } = req.cookies;

  console.log("verfytoken", accessToken);

  if (!accessToken) {
    return res.status(401).json("Unauthorized request!");
  }

  const decodedAccessToken = AccessTokenDecoder(accessToken);

  console.log("old access token", accessToken);
  console.log("decoded access token", decodedAccessToken);

  const username = decodedAccessToken.data;

  db.query(
    "SELECT username FROM users WHERE username = ?",
    [username],
    async (error, results) => {
      if (error) {
        console.log("Error while fetching data!", error);
      }
      if (results.length > 0) {
        req.username = results[0].username;
        return next();
      } else {
        return res.status(400).json("Invalid access token.");
      }
    }
  );
};
