import express from "express";
import "dotenv/config";
import mysql from "mysql";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

console.log("port", process.env.PORT);

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) {
    console.log("Error connecting to database!", error);
  } else {
    console.log(
      "Connection to database successful. Connected as id: " + db.threadId
    );
  }
});

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

//user routes
import userRouter from "./src/routes/user.routes.js";

app.use("/user", userRouter);
