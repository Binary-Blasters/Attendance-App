// pages/ViewStudents.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ViewStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get("/classes/students", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setStudents(res.data.students);
    };
    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Students</h1>
      {students.length === 0 ? (
        <p>No students enrolled yet</p>
      ) : (
        <ul className="space-y-2">
          {students.map((s) => (
            <li key={s._id} className="p-3 bg-white text-black rounded-xl shadow">
              {s.name} ({s.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
