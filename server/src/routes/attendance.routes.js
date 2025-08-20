import express from "express";
import { attendanceController } from "../controllers/attendance.controllers.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.route("/:classId/generate-otp").post(verifyToken("teacher"), attendanceController.generateOtp);
router.route("/:classId/mark-attendance").post(verifyToken("student"), attendanceController.markAttendance);
router.route("/:classId/attendance").get(verifyToken("teacher"), attendanceController.classAttendance);
router.route("/student/:studentId/attendance").get(verifyToken("teacher"), attendanceController.getStudentAttendance);
router.route("/student").get(verifyToken(), attendanceController.getStudentAttendance);

export default router;