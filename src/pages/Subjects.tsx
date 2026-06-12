import { useState, useEffect } from "react";
import api from "../api/axios";
import SubjectForm from "../components/SubjectForm";

interface Subject { id: number; name: string; }

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchSubjects = () => {
    api.get("/subject")
      .then((res) => { setSubjects(res.data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  };

  useEffect(() => { fetchSubjects(); }, []);

  if (loading) return <div className="loading"><div className="spinner"></div><p className="loading-text">Loading Subjects...</p></div>;
  if (error) return <div className="alert alert-error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Subjects</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Subject"}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <SubjectForm onSuccess={() => { setShowForm(false); fetchSubjects(); }} />
        </div>
      )}

      {subjects.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <p>No subjects created yet.</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>Add First Subject</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr><th>#</th><th>Subject Name</th></tr>
          </thead>
          <tbody>
            {subjects.map((s, i) => (
              <tr key={s.id}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
