import { BrowserRouter as Router, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard";
import NewClass from "./pages/NewClass";
import GenerateOTP from "./pages/GenerateOTP";
import ViewStudents from "./pages/ViewStudents";
import  Home  from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register";
import ViewClasses from "./pages/ViewClasses";
import ClassDetails from "./pages/ClassDetails";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/register" element={<Register/>}/>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-class" element={<NewClass />} />
        <Route path="/generate-otp" element={<GenerateOTP />} />
        <Route path="/students" element={<ViewStudents />} />
        <Route path="/classes" element={<ViewClasses/>}/>
        <Route path="/classes/:id" element={<ClassDetails/>}/>

      </Routes>
    </Router>
  );
}

export default App;
