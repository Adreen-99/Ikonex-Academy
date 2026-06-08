import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    streams: 0,
    subjects: 0,
    scores: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/student"),
      axios.get("http://localhost:5000/stream"),
      axios.get("http://localhost:5000/subject"),
      axios.get("http://localhost:5000/score"),
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
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p className="loading-text">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
          Dashboard
        </h1>
        <p style={{ color: "#64748b", fontSize: "15px" }}>
          System Overview & Key Metrics
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-4" style={{ marginBottom: "3rem" }}>
        {/* Students Stat Card */}
        <div 
          className="card card-stat" 
          style={{ 
            borderLeft: "5px solid #0066cc",
            padding: "2rem 1.5rem",
            position: "relative"
          }}
        >
          <div style={{ 
            fontSize: "3rem", 
            marginBottom: "1rem",
            opacity: "0.8"
          }}>
            
          </div>
          <div className="stat-value" style={{ fontSize: "2.5rem", color: "#0066cc" }}>
            {stats.students}
          </div>
          <div className="stat-label" style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Total Students
          </div>
        </div>

        {/* Streams Stat Card */}
        <div 
          className="card card-stat" 
          style={{ 
            borderLeft: "5px solid #10b981",
            padding: "2rem 1.5rem"
          }}
        >
          <div style={{ 
            fontSize: "3rem", 
            marginBottom: "1rem",
            opacity: "0.8"
          }}>
            
          </div>
          <div className="stat-value" style={{ fontSize: "2.5rem", color: "#10b981" }}>
            {stats.streams}
          </div>
          <div className="stat-label" style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Class Streams
          </div>
        </div>

        {/* Subjects Stat Card */}
        <div 
          className="card card-stat" 
          style={{ 
            borderLeft: "5px solid #f97316",
            padding: "2rem 1.5rem"
          }}
        >
          <div style={{ 
            fontSize: "3rem", 
            marginBottom: "1rem",
            opacity: "0.8"
          }}>
            
          </div>
          <div className="stat-value" style={{ fontSize: "2.5rem", color: "#f97316" }}>
            {stats.subjects}
          </div>
          <div className="stat-label" style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Subjects Offered
          </div>
        </div>

        {/* Scores Stat Card */}
        <div 
          className="card card-stat" 
          style={{ 
            borderLeft: "5px solid #ef4444",
            padding: "2rem 1.5rem"
          }}
        >
          <div style={{ 
            fontSize: "3rem", 
            marginBottom: "1rem",
            opacity: "0.8"
          }}>
            
          </div>
          <div className="stat-value" style={{ fontSize: "2.5rem", color: "#ef4444" }}>
            {stats.scores}
          </div>
          <div className="stat-label" style={{ color: "#64748b", marginTop: "0.5rem" }}>
            Score Records
          </div>
        </div>
      </div>

      {/* Information Sections */}
      <div className="grid grid-2" style={{ gap: "2rem" }}>
        {/* System Overview */}
        <div className="card">
          <h3 style={{ 
            color: "#0066cc", 
            fontSize: "18px", 
            fontWeight: "700",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "2px solid #e2e8f0"
          }}>
             System Overview
          </h3>
          <div style={{ lineHeight: "1.8" }}>
            <p style={{ marginBottom: "1rem", color: "#475569" }}>
              <strong>Ikonex Academy</strong> is a comprehensive school management system designed to streamline educational operations including student registration, class management, subject allocation, and academic assessment.
            </p>
            <div style={{ marginTop: "1.5rem" }}>
              <p style={{ fontSize: "13px", color: "#64748b", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.75rem" }}>
                Core Capabilities
              </p>
              <ul style={{ listStyle: "none", gap: "0.75rem", display: "flex", flexDirection: "column" }}>
                <li style={{ color: "#334155", fontSize: "14px" }}>✓ Student Management & Registration</li>
                <li style={{ color: "#334155", fontSize: "14px" }}>✓ Class Stream Organization</li>
                <li style={{ color: "#334155", fontSize: "14px" }}>✓ Subject & Curriculum Management</li>
                <li style={{ color: "#334155", fontSize: "14px" }}>✓ Score Recording & Assessment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="card">
          <h3 style={{ 
            color: "#0066cc", 
            fontSize: "18px", 
            fontWeight: "700",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "2px solid #e2e8f0"
          }}>
             Quick Navigation
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ paddingBottom: "1rem", borderBottom: "1px solid #f1f5f9" }}>
              <p style={{ color: "#0066cc", fontWeight: "600", marginBottom: "0.25rem" }}>Class Streams</p>
              <p style={{ color: "#64748b", fontSize: "14px" }}>Manage Form 1A, Form 1B, etc.</p>
            </div>
            <div style={{ paddingBottom: "1rem", borderBottom: "1px solid #f1f5f9" }}>
              <p style={{ color: "#0066cc", fontWeight: "600", marginBottom: "0.25rem" }}>Students</p>
              <p style={{ color: "#64748b", fontSize: "14px" }}>Register and manage student records</p>
            </div>
            <div style={{ paddingBottom: "1rem", borderBottom: "1px solid #f1f5f9" }}>
              <p style={{ color: "#0066cc", fontWeight: "600", marginBottom: "0.25rem" }}>Subjects</p>
              <p style={{ color: "#64748b", fontSize: "14px" }}>Create and organize subjects</p>
            </div>
            <div>
              <p style={{ color: "#0066cc", fontWeight: "600", marginBottom: "0.25rem" }}>Scores</p>
              <p style={{ color: "#64748b", fontSize: "14px" }}>Record exam and CA scores</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="card" style={{ marginTop: "3rem", background: "#f8fafc", textAlign: "center", borderTop: "2px solid #e2e8f0" }}>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Last Updated: Today | Academic Year: 2024/2025 | System Status: <span style={{ color: "#10b981", fontWeight: "600" }}>●</span> Active
        </p>
      </div>
    </div>
  );
}