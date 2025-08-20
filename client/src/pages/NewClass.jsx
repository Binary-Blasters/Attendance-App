// pages/NewClass.jsx
import { useState } from "react";
import api from "../api/axios";

export default function NewClass() {
  const [className, setClassName] = useState("");

  const handleCreate = async () => {
    try {
      await api.post("/classes/", { name: className }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Class Created Successfully 🎉");
    } catch (err) {
      alert("Error creating class");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Create a New Class</h1>
      <input 
        type="text" 
        placeholder="Enter Class Name"
        className="mt-4 p-2 border rounded-xl w-full"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />
      <button 
        onClick={handleCreate}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-xl"
      >
        Create
      </button>
    </div>
  );
}
