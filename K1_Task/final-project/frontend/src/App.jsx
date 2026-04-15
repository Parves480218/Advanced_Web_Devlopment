import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import UsersPage from "./pages/UsersPage";

function App() {
  return (
    <BrowserRouter>
      <nav className="fixed top-0 left-0 w-full bg-[#004E89] shadow z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white">PaddleJoy</h1>
          <div className="flex gap-6 text-white font-medium">
            <Link to="/" className="hover:text-[#00BFA6] transition">
              Home
            </Link>
            <Link to="/form" className="hover:text-[#00BFA6] transition">
              Form
            </Link>
            <Link to="/users" className="hover:text-[#00BFA6] transition">
              Users
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;