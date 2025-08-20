// pages/GenerateOTP.jsx
import { useState } from "react";
import api from "../api/axios";

export default function GenerateOTP() {
  const [otp, setOtp] = useState(null);

  const handleGenerate = async () => {
    try {
      const res = await api.post("/attendance/generate-otp", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setOtp(res.data.otp);
    } catch (err) {
      alert("Error generating OTP");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Generate OTP</h1>
      <button 
        onClick={handleGenerate}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl"
      >
        Generate OTP
      </button>
      {otp && (
        <p className="mt-4 text-lg font-semibold">Your OTP: {otp}</p>
      )}
    </div>
  );
}
