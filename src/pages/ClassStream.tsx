import { useState, useEffect } from "react";
import api from "../api/axios";

interface ClassStream { id: number; name: string; students?: { id: number }[]; }

export default function ClassStream() {
  const [streams, setStreams] = useState<ClassStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fetchStreams = () => {
    api.get("/stream")
      .then((res) => { setStreams(res.data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  };

  useEffect(() => { fetchStreams(); }, []);

  const handleSubmit = () => {
    if (!name.trim()) { setFormError("Stream name is required"); return; }
    setSubmitting(true);
    setFormError(null);
    api.post("/stream", { name: name.trim() })
      .then(() => { setName(""); setShowForm(false); fetchStreams(); })
      .catch((err) => {
        setFormError(err.response?.data?.error || err.message);
        setSubmitting(false);
      });
  };

  if (loading) return <div className="loading"><div className="spinner"></div><p className="loading-text">Loading Streams...</p></div>;
  if (error) return <div className="alert alert-error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Class Streams</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Stream"}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3>New Class Stream</h3>
          {formError && <div className="alert alert-error" style={{ marginBottom: "1rem" }}>{formError}</div>}
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label>Stream Name</label>
              <input
                type="text"
                placeholder="e.g. Form 1A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
            </div>
            <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Saving..." : "Save Stream"}
            </button>
          </div>
        </div>
      )}

      {streams.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏫</div>
          <p>No class streams created yet.</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>Add First Stream</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Stream Name</th>
              <th>Total Students</th>
            </tr>
          </thead>
          <tbody>
            {streams.map((s) => (
              <tr key={s.id}>
                <td><span className="badge badge-primary">{s.name}</span></td>
                <td>{s.students?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
