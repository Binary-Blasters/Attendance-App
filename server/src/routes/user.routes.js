import express from "express";
import { userController } from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").post(verifyToken(), userController.logout);
router.route("/profile").get(verifyToken(), userController.getUserProfile);
router.route("/profile").put(verifyToken(), userController.updateUserProfile);

export default router;
