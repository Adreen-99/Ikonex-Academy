import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import ClassStream from "./pages/ClassStream";
import Scores from "./pages/Scores";

function App() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="app-container">
      <nav>
        <div className="navbar">
          <h1>Ikonex Academy</h1>
          <div className="nav-links">
            {[
              { to: "/", label: "Dashboard" },
              { to: "/streams", label: "Class Streams" },
              { to: "/students", label: "Students" },
              { to: "/subjects", label: "Subjects" },
              { to: "/scores", label: "Scores" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  background: isActive(to)
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
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
