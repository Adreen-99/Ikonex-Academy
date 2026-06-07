import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "1rem",
        display: "flex",
        gap: "1rem",
        backgroundColor: "#1e293b",
        }}
        >
      <Link to="/" style={{ color: "white" }}>Dashboard</Link>

      <Link to="/students" style={{ color: "white" }}>
        Students
      </Link>

      <Link to="/subjects" style={{ color: "white" }}>
        Subjects
      </Link>

      <Link to="/streams" style={{ color: "white" }}>
        Class Streams
      </Link>

      <Link to="/scores" style={{ color: "white" }}>
        Scores
      </Link>

      <Link to="/reports" style={{ color: "white" }}>
        Reports
      </Link>
    </nav>
  );
}