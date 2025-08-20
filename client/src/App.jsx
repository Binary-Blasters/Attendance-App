import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import NewClass from "./pages/NewClass";
import GenerateOTP from "./pages/GenerateOTP";
import ViewStudents from "./pages/ViewStudents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-class" element={<NewClass />} />
        <Route path="/generate-otp" element={<GenerateOTP />} />
        <Route path="/students" element={<ViewStudents />} />
      </Routes>
    </Router>
  );
}

export default App;
