import express from "express";
import {
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.route("/register").post(userRegistration);
router.route("/login").get(userLogin);
router.route("/logout").get(userLogout);

export default router;
