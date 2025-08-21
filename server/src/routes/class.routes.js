import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { classController } from "../controllers/class.controllers.js";

const router = express.Router();

router
  .route("/")
  .post(verifyToken("teacher"), classController.createClass)
  // .get(verifyToken("student"),classController.getClassForStudent)
  .get(verifyToken("teacher"), classController.getAllClasses);

router
  .route("/:id")
  .get(verifyToken(), classController.getClass)
  .put(verifyToken("teacher"), classController.updateClass)
  .delete(verifyToken("teacher"), classController.deleteClass);

router
  .route("/:id/request")
  .post(verifyToken("student"), classController.requestToJoinClass);
router
  .route("/:classId/reject/:studentId")
  .delete(verifyToken("teacher"), classController.rejectStudentRequest);

router
  .route("/:classId/accept/:studentId")
  .delete(verifyToken("teacher"), classController.acceptStudentRequest);

router
  .route("/:classId/remove/:studentId")
  .delete(verifyToken("teacher"), classController.removeStudentFromClass);

export default router;
