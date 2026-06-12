import { useState, useEffect } from "react";
import api from "../api/axios";
import StudentForm from "../components/StudentForm";

interface Stream { id: number; name: string; }
interface Student {
  id: number;
  admissionNumber: string;
  firstName: string;
  lastName: string;
  classStreamId: number;
  classStream?: Stream;
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAll = () => {
    Promise.all([api.get("/student"), api.get("/stream")])
      .then(([s, st]) => {
        setStudents(s.data);
        setStreams(st.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => { fetchAll(); }, []);

  if (loading) return <div className="loading"><div className="spinner"></div><p className="loading-text">Loading Students...</p></div>;
  if (error) return <div className="alert alert-error">Error: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Students</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Student"}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: "2rem" }}>
          <StudentForm
            streams={streams}
            onSuccess={() => { setShowForm(false); fetchAll(); }}
          />
        </div>
      )}

      {students.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👨‍🎓</div>
          <p>No students registered yet.</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>Add First Student</button>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Admission No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Class Stream</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td><span className="badge badge-primary">{s.admissionNumber}</span></td>
                <td>{s.firstName}</td>
                <td>{s.lastName}</td>
                <td><span className="badge badge-gray">{s.classStream?.name ?? s.classStreamId}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
