import { useState } from "react";
import api from "../api/axios";

interface Stream { id: number; name: string; }
interface Props {
  streams: Stream[];
  onSuccess: () => void;
}

export default function StudentForm({ streams, onSuccess }: Props) {
  const [form, setForm] = useState({ admissionNumber: "", firstName: "", lastName: "", classStreamId: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!form.admissionNumber || !form.firstName || !form.lastName || !form.classStreamId) {
      setError("All fields are required"); return;
    }
    setSubmitting(true);
    setError(null);
    api.post("/student", { ...form, classStreamId: Number(form.classStreamId) })
      .then(() => { onSuccess(); })
      .catch((err) => { setError(err.response?.data?.error || err.message); setSubmitting(false); });
  };

  return (
    <div>
      <h3>Register New Student</h3>
      {error && <div className="alert alert-error" style={{ marginBottom: "1rem" }}>{error}</div>}
      <div className="grid grid-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label>Admission Number</label>
          <input type="text" placeholder="e.g. ADM001" value={form.admissionNumber}
            onChange={(e) => setForm({ ...form, admissionNumber: e.target.value })} />
        </div>
        <div>
          <label>Class Stream</label>
          <select value={form.classStreamId} onChange={(e) => setForm({ ...form, classStreamId: e.target.value })}>
            <option value="">Select stream...</option>
            {streams.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="First name" value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last name" value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        </div>
      </div>
      <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Saving..." : "Register Student"}
      </button>
    </div>
  );
}
