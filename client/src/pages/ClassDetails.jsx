import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../api/axios";
import { 
  Users, BookOpen, ChevronLeft, UserX, 
  UserCheck, Loader2, KeyRound, Clock 
} from "lucide-react";

export default function ClassDetails() {
  const { id } = useParams(); // classId from URL
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [otp, setOtp] = useState(null);
  const [validTill, setValidTill] = useState(null);
  const navigate = useNavigate();

  const fetchClass = async () => {
    try {
      const res = await api.get(`/classes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCls(res.data.data.class);
    } catch (err) {
      console.error("Error fetching class details", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateOtp = async () => {
    setActionLoading("otp");
    try {
      const res = await api.post(`/attendance/${id}/generate-otp`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOtp(res.data.data);
      setValidTill(new Date(Date.now() + 15 * 60 * 1000));
    } catch (err) {
      console.error("Error generating OTP", err);
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchClass();
  }, [id]);

  // countdown for OTP
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    if (!validTill) return;
    const interval = setInterval(() => {
      const diff = validTill - Date.now();
      if (diff <= 0) {
        setTimeLeft("Expired ❌");
        clearInterval(interval);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${mins}m ${secs}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [validTill]);

  // ✅ Accept request
  const handleAccept = async (studentId) => {
    setActionLoading(studentId + "-accept");
    try {
      await api.delete(`/classes/${id}/accept/${studentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchClass();
    } catch (err) {
      console.error("Error accepting request", err);
    } finally {
      setActionLoading(null);
    }
  };

  // ❌ Reject request
  const handleReject = async (studentId) => {
    setActionLoading(studentId + "-reject");
    try {
      await api.delete(`/classes/${id}/reject/${studentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchClass();
    } catch (err) {
      console.error("Error rejecting request", err);
    } finally {
      setActionLoading(null);
    }
  };

  // 🔥 Remove student
  const handleRemove = async (studentId) => {
    setActionLoading(studentId + "-remove");
    try {
      await api.delete(`/classes/${id}/remove/${studentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchClass();
    } catch (err) {
      console.error("Error removing student", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white">
        <Loader2 className="animate-spin w-8 h-8 mr-2" />
        <p className="text-xl font-semibold">Loading class details...</p>
      </div>
    );
  }

  if (!cls) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white">
        <p className="text-xl font-semibold">Class not found ❌</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 p-6 text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-black/40 hover:bg-black/60 rounded-xl flex items-center gap-2"
      >
        <ChevronLeft /> Back
      </button>

      {/* Class Info */}
      <div className="bg-white text-black rounded-2xl shadow-xl p-6 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-4">
          <BookOpen className="text-purple-600" /> {cls.className}
        </h1>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Subject:</span> {cls.subject}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Class ID:</span> {cls.classId}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Created At: {new Date(cls.createdAt).toLocaleString()}
        </p>
      </div>

      {/* OTP Section */}
      <div className="bg-white text-black rounded-2xl shadow-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <KeyRound className="text-purple-600" /> OTP for Attendance
        </h2>
        {otp ? (
          <div className="p-4 bg-gray-100 rounded-lg shadow flex flex-col gap-2 items-start">
            <p className="text-xl font-bold">OTP: <span className="text-purple-600">{otp}</span></p>
            <p className="flex items-center gap-2 text-gray-700">
              <Clock size={16} /> Valid for: {timeLeft}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mb-3">No OTP generated yet</p>
        )}
        <button
          onClick={handleGenerateOtp}
          disabled={actionLoading === "otp"}
          className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          {actionLoading === "otp" ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <>
              <KeyRound size={16} /> Generate OTP
            </>
          )}
        </button>
      </div>

      {/* Requests Section */}
      <div className="bg-white text-black rounded-2xl shadow-xl p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Join Requests ({cls.requests.length})
        </h2>
        {cls.requests.length > 0 ? (
          <ul className="space-y-2">
            {cls.requests.map((r) => (
              <li
                key={r._id}
                className="p-3 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
              >
                <span>{r.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(r._id)}
                    disabled={actionLoading === r._id + "-accept"}
                    className="px-3 py-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-lg flex items-center gap-1"
                  >
                    {actionLoading === r._id + "-accept" ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <>
                        <UserCheck size={16} /> Accept
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleReject(r._id)}
                    disabled={actionLoading === r._id + "-reject"}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-lg flex items-center gap-1"
                  >
                    {actionLoading === r._id + "-reject" ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <>
                        <UserX size={16} /> Reject
                      </>
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No join requests</p>
        )}
      </div>

      {/* Students Section */}
      <div className="bg-white text-black rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <Users className="text-purple-600" /> Students ({cls.students.length})
        </h2>
        {cls.students.length > 0 ? (
          <ul className="space-y-2">
            {cls.students.map((s) => (
              <li
                key={s._id}
                className="p-3 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
              >
                <span>{s.name}</span>
                <button
                  onClick={() => handleRemove(s._id)}
                  disabled={actionLoading === s._id + "-remove"}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-lg flex items-center gap-1"
                >
                  {actionLoading === s._id + "-remove" ? (
                    <Loader2 className="animate-spin w-4 h-4" />
                  ) : (
                    <>
                      <UserX size={16} /> Remove
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No students enrolled yet</p>
        )}
      </div>
    </div>
  );
}
