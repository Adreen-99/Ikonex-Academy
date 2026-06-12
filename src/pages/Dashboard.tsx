import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, streams: 0, subjects: 0, scores: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/student"),
      api.get("/stream"),
      api.get("/subject"),
      api.get("/score"),
    ])
      .then(([students, streams, subjects, scores]) => {
        setStats({
          students: students.data.length,
          streams: streams.data.length,
          subjects: subjects.data.length,
          scores: scores.data.length,
        });
        setLoading(false);
      })
      .catch((err) => { console.error("Error:", err); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="loading">
      <div className="spinner"></div>
      <p className="loading-text">Loading Dashboard...</p>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>Dashboard</h1>
        <p style={{ color: "#64748b", fontSize: "15px" }}>System Overview & Key Metrics</p>
      </div>

      <div className="grid grid-4" style={{ marginBottom: "3rem" }}>
        {[
          { label: "Total Students", value: stats.students, color: "#0066cc", icon: "👨‍🎓" },
          { label: "Class Streams",  value: stats.streams,  color: "#10b981", icon: "🏫" },
          { label: "Subjects Offered", value: stats.subjects, color: "#f97316", icon: "📚" },
          { label: "Score Records",  value: stats.scores,   color: "#ef4444", icon: "📊" },
        ].map(({ label, value, color, icon }) => (
          <div key={label} className="card card-stat" style={{ borderLeft: `5px solid ${color}`, padding: "2rem 1.5rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.8 }}>{icon}</div>
            <div className="stat-value" style={{ fontSize: "2.5rem", color }}>{value}</div>
            <div className="stat-label" style={{ color: "#64748b", marginTop: "0.5rem" }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-2" style={{ gap: "2rem" }}>
        <div className="card">
          <h3 style={{ color: "#0066cc", fontSize: "18px", fontWeight: "700", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "2px solid #e2e8f0" }}>
            🏫 System Overview
          </h3>
          <p style={{ marginBottom: "1rem", color: "#475569", lineHeight: "1.8" }}>
            <strong>Ikonex Academy</strong> is a comprehensive school management system for student registration, class management, subject allocation, and academic assessment.
          </p>
          <p style={{ fontSize: "13px", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.75rem" }}>Core Capabilities</p>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["Student Management & Registration","Class Stream Organization","Subject & Curriculum Management","Score Recording & Assessment"].map(c => (
              <li key={c} style={{ color: "#334155", fontSize: "14px" }}>✓ {c}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 style={{ color: "#0066cc", fontSize: "18px", fontWeight: "700", marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "2px solid #e2e8f0" }}>
            🧭 Quick Navigation
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { title: "Class Streams", desc: "Manage Form 1A, Form 1B, etc." },
              { title: "Students",      desc: "Register and manage student records" },
              { title: "Subjects",      desc: "Create and organize subjects" },
              { title: "Scores",        desc: "Record exam and CA scores" },
            ].map(({ title, desc }, i, arr) => (
              <div key={title} style={{ paddingBottom: "1rem", borderBottom: i < arr.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                <p style={{ color: "#0066cc", fontWeight: "600", marginBottom: "0.25rem" }}>{title}</p>
                <p style={{ color: "#64748b", fontSize: "14px" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: "3rem", background: "#f8fafc", textAlign: "center", borderTop: "2px solid #e2e8f0" }}>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Academic Year: 2024/2025 | System Status: <span style={{ color: "#10b981", fontWeight: "600" }}>● Active</span>
        </p>
      </div>
    </div>
  );
}
