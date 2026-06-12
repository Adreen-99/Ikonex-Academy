import { useState } from "react";
import api from "../api/axios";

interface Student { id: number; firstName: string; lastName: string; admissionNumber: string; }
interface Subject { id: number; name: string; }
interface Props { students: Student[]; subjects: Subject[]; onSuccess: () => void; }

const ASSESSMENT_TYPES = ["CAT1", "CAT2", "MID-TERM", "END-TERM", "MOCK"];

export default function ScoreForm({ students, subjects, onSuccess }: Props) {
  const [form, setForm] = useState({ studentId: "", subjectId: "", assessmentType: "", score: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!form.studentId || !form.subjectId || !form.assessmentType || !form.score) {
      setError("All fields are required"); return;
    }
    const scoreNum = Number(form.score);
    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      setError("Score must be a number between 0 and 100"); return;
    }
    setSubmitting(true);
    setError(null);
    api.post("/score", {
      studentId: Number(form.studentId),
      subjectId: Number(form.subjectId),
      assessmentType: form.assessmentType,
      score: scoreNum,
    })
      .then(() => { onSuccess(); })
      .catch((err) => { setError(err.response?.data?.error || err.message); setSubmitting(false); });
  };

  return (
    <div>
      <h3>Record New Score</h3>
      {error && <div className="alert alert-error" style={{ marginBottom: "1rem" }}>{error}</div>}
      <div className="grid grid-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label>Student</label>
          <select value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
            <option value="">Select student...</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.firstName} {s.lastName} ({s.admissionNumber})</option>
            ))}
          </select>
        </div>
        <div>
          <label>Subject</label>
          <select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
            <option value="">Select subject...</option>
            {subjects.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label>Assessment Type</label>
          <select value={form.assessmentType} onChange={(e) => setForm({ ...form, assessmentType: e.target.value })}>
            <option value="">Select type...</option>
            {ASSESSMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label>Score (0–100)</label>
          <input type="number" min="0" max="100" placeholder="e.g. 85" value={form.score}
            onChange={(e) => setForm({ ...form, score: e.target.value })} />
        </div>
      </div>
      <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Saving..." : "Record Score"}
      </button>
    </div>
  );
}
