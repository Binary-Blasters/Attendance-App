import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { User, BookOpen, Users, ClipboardList, LogOut } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setUser(res.data.data.user);
      } catch {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  // Loader
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-black/30 backdrop-blur-md">
        <h1 className="text-2xl font-bold flex items-center gap-2">📚 AttendanceApp</h1>
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

        {user.role === "teacher" ? <TeacherDashboard user={user} /> : <StudentDashboard user={user} />}
      </main>
    </div>
  );
}

function TeacherDashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile Card */}
      <div className="bg-white text-black shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User /> My Profile
        </h2>
        <p className="mt-2 text-gray-600">Name: {user.name}</p>
        <p className="text-gray-600">Role: {user.role}</p>
        <p className="text-gray-600">ID: {user._id}</p>
      </div>

      {/* Create Class */}
      <div className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
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

      {/* Manage Classes */}
      <div className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users /> My Classes
        </h2>
        <p className="text-sm text-gray-600 mt-2">View & manage your classes</p>
        <button 
          onClick={() => navigate("/classes")}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600"
        >
          View Classes
        </button>
      </div>
    </div>
  );
}

function StudentDashboard({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Profile */}
      <div className="bg-white text-black shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <User /> My Profile
        </h2>
        <p className="mt-2 text-gray-600">Name: {user.name}</p>
        <p className="text-gray-600">Role: {user.role}</p>
        <p className="text-gray-600">ID: {user._id}</p>
      </div>

      {/* Join Class */}
      <div className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen /> Join Class
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Request teacher to join a class
        </p>
        <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600">
          Request to Join
        </button>
      </div>

      {/* My Classes */}
      <div className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users /> My Classes
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          View the classes you are enrolled in
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
          View Classes
        </button>
      </div>

      {/* Attendance History */}
      <div className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-xl transition col-span-1 md:col-span-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ClipboardList /> Attendance History
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Check your past attendance records
        </p>
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
          View History
        </button>
      </div>
    </div>
  );
}
