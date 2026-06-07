import { useState, useEffect } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/student")
      .then((res) => {
        console.log("Full Response:", res.data);
        console.log("First item:", res.data[0]); // Look at this!
        
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setError(err.message);
      });
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!students || students.length === 0) return <p>No students</p>;

  return (
    <div>
      <h1>Students</h1>
      <pre>{JSON.stringify(students[0], null, 2)}</pre>
    </div>
  );
}