import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { User, BookOpen, KeyRound, Users, ClipboardList, LogOut } from "lucide-react"; // icons

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        console.log(res.data.data.user);
        
        setUser(res.data.data.user);
      } catch {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!user) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white">
      
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-black/30 backdrop-blur-md">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📚 AttendanceApp
        </h1>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <User size={20} /> {user.name} ({user.role})
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-500 rounded-xl hover:bg-red-600 transition flex items-center gap-2"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.name} 👋</h1>
        <p className="mb-8 text-lg text-white/90">
          Role: <span className="font-semibold capitalize">{user.role}</span>
        </p>

        {user.role === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}
      </main>
    </div>
  );
}

function TeacherDashboard() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white text-black shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen /> Create Class
        </h2>
        <p className="text-sm text-gray-600 mt-2">Make a new class for students</p>
        <button 
          onClick={() => navigate("/new-class")}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
        >
          + New Class
        </button>
      </div>

      <div className="bg-white text-black shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <KeyRound /> Generate OTP
        </h2>
        <p className="text-sm text-gray-600 mt-2">Create OTP for attendance</p>
        <button 
          onClick={() => navigate("/generate-otp")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
        >
          Generate
        </button>
      </div>

      <div className="bg-white text-black shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users /> My Students
        </h2>
        <p className="text-sm text-gray-600 mt-2">View & manage student list</p>
        <button 
          onClick={() => navigate("/students")}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600"
        >
          View Students
        </button>
      </div>
    </div>
  );
}


function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen /> Join Class
        </h2>
        <p className="text-sm text-gray-600 mt-2">Request teacher to join class</p>
        <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600">
          Request to Join
        </button>
      </div>

      <div className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ClipboardList /> Mark Attendance
        </h2>
        <p className="text-sm text-gray-600 mt-2">Enter OTP given by teacher</p>
        <input 
          type="text" 
          placeholder="Enter OTP"
          className="w-full mt-2 p-2 border rounded-xl"
        />
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
          Submit
        </button>
      </div>

      <div className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users /> My Classes
        </h2>
        <p className="text-sm text-gray-600 mt-2">View classes you joined</p>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
          View Classes
        </button>
      </div>

    </div>
  );
}

