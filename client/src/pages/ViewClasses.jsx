import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import { Users, BookOpen, PlusCircle, FolderOpen, Loader2 } from "lucide-react";

export default function ViewClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await api.get("/classes", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setClasses(res.data.data.classes);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // ⏳ Loader Screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white">
        <Loader2 size={60} className="animate-spin mb-6" />
        <h2 className="text-xl font-semibold">Fetching your classes...</h2>
      </div>
    );
  }

  // 📂 If no classes -> Empty State UI
  if (!classes.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white">
        <FolderOpen size={80} className="mb-6 opacity-80" />
        <h2 className="text-2xl font-bold mb-2">No Classes Yet</h2>
        <p className="text-white/80 mb-6">
          You haven’t created any classes. Start by creating your first class!
        </p>
        <button
          onClick={() => navigate("/new-class")}
          className="px-6 py-3 flex items-center gap-2 bg-green-500 hover:bg-green-600 rounded-xl shadow-lg transition"
        >
          <PlusCircle size={20} /> Create New Class
        </button>
      </div>
    );
  }

  // 📚 If classes exist -> Show Grid
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white p-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-black/40 hover:bg-black/60 rounded-xl"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-6">📚 My Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="bg-white text-black shadow-lg rounded-2xl p-6 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            {/* Class Info */}
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen /> {cls.className}
            </h2>
            <p className="text-sm text-gray-600">Subject: {cls.subject}</p>
            <p className="text-sm text-gray-600">Class ID: {cls.classId}</p>

            {/* Students list */}
            <div className="mt-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Users size={18} /> Students ({cls.students.length})
              </h3>
              {cls.students.length > 0 ? (
                <ul className="mt-2 space-y-1 text-sm text-gray-700">
                  {cls.students.map((s) => (
                    <li
                      key={s._id}
                      className="bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition"
                    >
                      {s.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 mt-2">No students yet</p>
              )}
            </div>

            {/* Action button */}
            <button
              onClick={() => navigate(`/classes/${cls._id}`)}
              className="mt-4 w-full bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
