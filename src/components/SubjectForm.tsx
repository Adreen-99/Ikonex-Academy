import { useState } from "react";
import api from "../api/axios";

interface Props { onSuccess: () => void; }

export default function SubjectForm({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) { setError("Subject name is required"); return; }
    setSubmitting(true);
    setError(null);
    api.post("/subject", { name: name.trim() })
      .then(() => { onSuccess(); })
      .catch((err) => { setError(err.response?.data?.error || err.message); setSubmitting(false); });
  };

  return (
    <div>
      <h3>Add New Subject</h3>
      {error && <div className="alert alert-error" style={{ marginBottom: "1rem" }}>{error}</div>}
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <label>Subject Name</label>
          <input type="text" placeholder="e.g. Mathematics" value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
        </div>
        <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Saving..." : "Add Subject"}
        </button>
      </div>
    </div>
  );
}
