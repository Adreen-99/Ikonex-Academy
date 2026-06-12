import { useState, useEffect } from "react";
import api from "../api/axios";
import ScoreForm from "../components/ScoreForm";

interface Student { id: number; firstName: string; lastName: string; admissionNumber: string; }
interface Subject { id: number; name: string; }
interface Score {
  id: number;
  studentId: number;
  subjectId: number;
  assessmentType: string;
  score: number;
  student?: Student;
  subject?: Subject;
}

export default function Scores() {
  const [scores, setScores] = useState<Score[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAll = () => {
    Promise.all([api.get("/score"), api.get("/student"), api.get("/subject")])
      .then(([sc, st, su]) => {
        setScores(sc.data);
        setStudents(st.data);
        setSubjects(su.data);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  };

  useEffect(() => { fetchAll(); }, []);

  const getGradeBadge = (score: number) => {
    if (score >= 80) return "badge-success";
    if (score >= 60) return "badge-primary";
    if (score >= 40) return "badge-warning";
    return "badge-danger";
  };

  if (loading) return <div className="loading"><div className="spinner"></div><p className="loading-text">Loading Scores...</p></div>;
  if (error) return <div className="alert alert-error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Scores</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Record Score"}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <ScoreForm
            students={students}
            subjects={subjects}
            onSuccess={() => { setShowForm(false); fetchAll(); }}
          />
        </div>
      )}

      {scores.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <p>No scores recorded yet.</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>Record First Score</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Admission No.</th>
              <th>Subject</th>
              <th>Assessment</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s.id}>
                <td>{s.student ? `${s.student.firstName} ${s.student.lastName}` : s.studentId}</td>
                <td><span className="badge badge-gray">{s.student?.admissionNumber ?? "—"}</span></td>
                <td>{s.subject?.name ?? s.subjectId}</td>
                <td><span className="badge badge-primary">{s.assessmentType}</span></td>
                <td><span className={`badge ${getGradeBadge(s.score)}`}>{s.score}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
