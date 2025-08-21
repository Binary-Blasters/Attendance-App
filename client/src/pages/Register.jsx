import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Register() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/register", {
        name,
        userName,
        email,
        password,
        role,
      });
      alert(res.data.message || "Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[400px]">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account ✨
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
          />

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
