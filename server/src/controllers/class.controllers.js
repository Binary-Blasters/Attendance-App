import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Class from "../models/class.models.js";

export const classController = {
  createClass: asyncHandler(async (req, res) => {
    const { className, subject } = req.body;
    const teacher = req.user._id;
    const classId = `${className}-${Date.now()}`;
    if (!className || !subject || !teacher) {
      throw new ApiError("All fields are required", 400);
    }
    const newClass = await Class.create({ className, subject, teacher, classId });
    return res
      .status(201)
      .json(new ApiResponse("Class created successfully", { class: newClass }));
  }),
  getAllClasses: asyncHandler(async (req, res) => {
    const teacherId = req.user._id

    const classes = await Class.find({teacher : teacherId}).populate("students", "name");
    return res
      .status(200)
      .json(new ApiResponse("Classes fetched successfully", { classes }));
  }),
  getClass: asyncHandler(async (req, res) => {
    const classId = req.params.id;
    const fetchedClass = await Class.findById(classId).populate("students","name") .populate("requests", "name");
    if (!fetchedClass) {
      throw new ApiError("Class not found", 404);
    }
    return res
      .status(200)
      .json(new ApiResponse("Class fetched successfully", { class: fetchedClass }));
  }),
  updateClass: asyncHandler(async (req, res) => {
    const classId = req.params.id;
    const { name, subject, teacher } = req.body;
    const Class = await Class.findById(classId);
    if (!Class) {
      throw new ApiError("Class not found", 404);
    }
    Class.name = name || Class.name;
    Class.subject = subject || Class.subject;
    Class.teacher = teacher || Class.teacher;
    await Class.save();
    return res
      .status(200)
      .json(new ApiResponse("Class updated successfully", { class: Class }));
  }),
  deleteClass: asyncHandler(async (req, res) => {
    const classId = req.params.id;
    const fetchedClass = await Class.findByIdAndDelete(classId);
    if (!fetchedClass) {
      throw new ApiError("Class not found", 404);
    }
    return res
      .status(200)
      .json(new ApiResponse("Class deleted successfully"));
  }),
  requestToJoinClass: asyncHandler(async (req, res) => {
    const classId = req.params.id;
    const userId = req.user._id;
    const fetchedClass = await Class.findById(classId);
    if (!fetchedClass) {
      throw new ApiError("Class not found", 404);
    }
    if (fetchedClass.requests.includes(userId)) {
      throw new ApiError("You have already requested to join this class", 400);
    }
    fetchedClass.requests.push(userId);
    await fetchedClass.save();
    return res
      .status(200)
      .json(new ApiResponse("Request to join class sent successfully"));
  }),
  acceptStudentRequest: asyncHandler(async (req, res) => {
    const {classId, studentId} = req.params;
    
    const fetchedClass = await Class.findById(classId);
    if (!fetchedClass) {
      throw new ApiError("Class not found", 404);
    }
    if (!fetchedClass.requests.includes(studentId)) {
      throw new ApiError("No request found from this user", 404);
    }
    fetchedClass.students.push(studentId);
    fetchedClass.requests.pull(studentId);
    await fetchedClass.save();
    return res
      .status(200)
      .json(new ApiResponse("Student request accepted successfully"));
  }),
  rejectStudentRequest: asyncHandler(async (req, res) => {
    const {classId, studentId} = req.params;
    const fetchedClass = await Class.findById(classId);
    if (!fetchedClass) {
      throw new ApiError("Class not found", 404);
    }
    if (!fetchedClass.requests.includes(studentId)) {
      throw new ApiError("No request found from this user", 404);
    }
    fetchedClass.requests.pull(studentId);
    await fetchedClass.save();
    return res
      .status(200)
      .json(new ApiResponse("Student request rejected successfully"));
  }),
  removeStudentFromClass: asyncHandler(async (req, res) => {
    const { classId, studentId } = req.params;
    const fetchedClass = await Class.findById(classId);
    if (!fetchedClass) {
      throw new ApiError("Class not found", 404);
    }
    if (!fetchedClass.students.includes(studentId)) {
      throw new ApiError("Student not found in this class", 404);
    }
    fetchedClass.students.pull(studentId);
    await fetchedClass.save();
    return res
      .status(200)
      .json(new ApiResponse("Student removed from class successfully"));
  }),
};
