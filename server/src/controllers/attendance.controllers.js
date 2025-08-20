import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Class from "../models/class.models.js";
import OTP from "../models/otp.models.js";
import { Attendance } from "../models/attendance.models.js";

const formatDate = (date) => date.toISOString().split("T")[0];

export const attendanceController = {
  generateOtp: asyncHandler(async (req, res) => {
    const { classId } = req.params;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const validTill = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    const existingOtp = await OTP.findOne({ classId });
    if (existingOtp) {
      existingOtp.otp = otp;
      existingOtp.validTill = validTill;
      await existingOtp.save();
    } else {
      await OTP.create({ classId, otp, validTill });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, otp, "OTP generated successfully"));
  }),
  markAttendance: asyncHandler(async (req, res) => {
    const { classId } = req.params;
    const studentId = req.user?._id;
    const { otp } = req.body;

    const otpRecord = await OTP.findOne({ classId, otp });
    if (!otpRecord || otpRecord.validTill < new Date()) {
      throw new ApiError("Invalid OTP", 400);
    }
    if (req.user.role !== "student") {
      throw new ApiError("Only students can mark attendance", 403);
    }
    const fetchedClass = await Class.findById(classId);
    if (!fetchedClass) {
      throw new ApiError("Class not found", 404);
    }

    const student = fetchedClass.students.find((s) => s._id.equals(studentId));
    if (!student) {
      throw new ApiError("You are not a student of this class", 404);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const attendanceExists = await Attendance.findOne({
      student: studentId,
      class: classId,
      date: today,
    });
    if (attendanceExists) {
      throw new ApiError("Attendance already marked for today", 400);
    }
    const attendance = await Attendance.create({
      student: studentId,
      class: fetchedClass._id,
      date: new Date(),
      status: "present",
    });

    return res
      .status(200)
      .json(new ApiResponse(200, attendance, "Attendance marked successfully"));
  }),
  classAttendance: asyncHandler(async (req, res) => {
    const { classId } = req.params;
    const attendanceRecords = await Attendance.find({ class: classId }).populate("student", "name").select("student date status ");
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          attendanceRecords,
          "Class attendance fetched successfully"
        )
      );
  }),
  getStudentAttendance: asyncHandler(async (req, res) => {
  let studentId;

  if (req.user.role === "teacher") {
    studentId = req.params.studentId;
    if (!studentId) {
      throw new ApiError("Student ID is required for teacher", 400);
    }
  } else if (req.user.role === "student") {
    studentId = req.user._id;
  } else {
    throw new ApiError("Unauthorized", 403);
  }

  const attendanceRecords = await Attendance.find({ student: studentId })
    .populate("class", "className")
    .populate("student", "name userName")
    .select("class student date status");

  if (!attendanceRecords.length) {
    throw new ApiError("No attendance records found", 404);
  }

  const formattedRecords = attendanceRecords.map((record) => ({
    student: record.student,         
    class: record.class,
    date: record.date.toISOString().split("T")[0], 
    status: record.status,
  }));

  return res
    .status(200)
    .json(new ApiResponse(200, formattedRecords, "Student attendance fetched successfully"));
}),


};
