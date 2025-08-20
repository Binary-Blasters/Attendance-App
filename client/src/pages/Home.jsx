import { Link } from "react-router";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 text-white flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-black/20 backdrop-blur-md">
        <h1 className="text-2xl font-bold">📚 AttendanceApp</h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-extrabold leading-tight">
          Smart Attendance <br /> for <span className="text-yellow-300">Teachers & Students</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg">
          Manage classes, generate OTP, and mark attendance seamlessly.  
          No more manual registers — everything digital, fast, and reliable.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/login" className="px-6 py-3 bg-yellow-400 text-black rounded-xl shadow hover:bg-yellow-500">
            Get Started
          </Link>
          <Link to="/register" className="px-6 py-3 bg-white text-indigo-700 rounded-xl shadow hover:bg-gray-200">
            Register Now
          </Link>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white text-black py-16 px-6">
        <h3 className="text-3xl font-bold text-center mb-10">✨ Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">🧑‍🏫 For Teachers</h4>
            <p>Create classes, approve students, generate OTPs, and view attendance reports easily.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">🎓 For Students</h4>
            <p>Join classes, mark attendance with OTP, and track your attendance history.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <h4 className="text-xl font-semibold mb-2">📊 Reports</h4>
            <p>Attendance analytics with graphs and insights to keep track of progress.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 text-center py-4">
        <p>© {new Date().getFullYear()} AttendanceApp. All rights reserved.</p>
      </footer>
    </div>
  );
}
