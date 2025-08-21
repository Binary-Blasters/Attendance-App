import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { BookOpen, PenLine } from "lucide-react";

export default function NewClass() {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!className || !subject) {
      alert("Please enter both Class Name and Subject ⚠️");
      return;
    }
    setLoading(true);
    try {
      await api.post(
        "/classes/",
        { className, subject },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("✅ Class Created Successfully 🎉");
      navigate("/classes"); // After creation go to classes list
    } catch (err) {
      alert("❌ Error creating class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
          <BookOpen className="text-purple-600" /> Create New Class
        </h1>

        {/* Class Name */}
        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-medium mb-2">
            Class Name
          </label>
          <input
            type="text"
            placeholder="e.g. Physics 101"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>

        {/* Subject */}
        <div className="mb-4 text-left">
          <label className="block text-gray-700 font-medium mb-2">Subject</label>
          <input
            type="text"
            placeholder="e.g. Physics"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition shadow-md"
        >
          {loading ? "Creating..." : <><PenLine size={18}/> Create Class</>}
        </button>
      </div>
    </div>
  );
}
