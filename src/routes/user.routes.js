import express from "express";
import {
  refreshExistingTokens,
  userLogin,
  userLogout,
  userRegistration,
  viewDashboard,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

//user routes
router.route("/register").post(userRegistration);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyToken, userLogout);
router.route("/refresh-access-token").post(verifyToken, refreshExistingTokens);
router.route("/dashboard").post(verifyToken, viewDashboard);

export default router;
