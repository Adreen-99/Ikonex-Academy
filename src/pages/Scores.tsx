import { useState, useEffect } from "react";
import axios from "axios";

interface Score {
  id: number;
  studentId: number;
  subjectId: number;
  assessmentType: string;
  score: number;
}

export default function Scores() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/score")
      .then((res) => setScores(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Scores</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Subject ID</th>
            <th>Assessment Type</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.id}>
              <td>{score.studentId}</td>
              <td>{score.subjectId}</td>
              <td>{score.assessmentType}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}