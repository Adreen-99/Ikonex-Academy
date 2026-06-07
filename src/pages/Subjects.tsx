import { useState, useEffect } from "react";
import axios from "axios";

interface Subject {
  id: number;
  name: string;
  code: string;
}

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/subject")
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Subjects</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.name}</td>
              <td>{subject.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}