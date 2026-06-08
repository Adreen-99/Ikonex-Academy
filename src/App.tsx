import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard.js";
import Students from "../src/pages/Students.js";
import Subjects from "../src/pages/Subjects.js";
import ClassStream from "../src/pages/ClassStream.js";
import Scores from "../src/pages/Scores.js";

function App() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;  

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav>
        <div className="navbar">
          <h1> Ikonex Academy</h1>
          <div className="nav-links">
            <Link 
              to="/" 
              style={{
                background: isActive("/") ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"
              }}
            >
              Dashboard
            </Link>
            <Link 
              to="/streams"
              style={{
                background: isActive("/streams") ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"
              }}
            >
              Class Streams
            </Link>
            <Link 
              to="/students"
              style={{
                background: isActive("/students") ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"
              }}
            >
              Students
            </Link>
            <Link 
              to="/subjects"
              style={{
                background: isActive("/subjects") ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"
              }}
            >
              Subjects
            </Link>
            <Link 
              to="/scores"
              style={{
                background: isActive("/scores") ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"
              }}
            >
              Scores
            </Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/streams" element={<ClassStream />} />
          <Route path="/students" element={<Students />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;