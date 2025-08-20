import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router"; // ✅ use react-router-dom

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-black/20 backdrop-blur-md text-white">
        <h1 className="text-2xl font-bold">📚 AttendanceApp</h1>
        <nav className="space-x-6">
          <button onClick={() => navigate("/")} className="hover:underline">Home</button>
          <button onClick={() => navigate("/register")} className="hover:underline">Register</button>
        </nav>
      </header>

      {/* Login Form */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-96">
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring focus:ring-indigo-300"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:ring focus:ring-indigo-300"
            />
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
