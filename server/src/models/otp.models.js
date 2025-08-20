import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    otp: { type: String, required: true },
    validTill: { type: Date, required: true },
  },
  { timestamps: true }
);
otpSchema.index({ validTill: 1 }, { expireAfterSeconds: 0 });


const OTP =  mongoose.model("OTP", otpSchema);
export default OTP;
