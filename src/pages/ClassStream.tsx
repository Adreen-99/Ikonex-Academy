import { useState, useEffect } from "react";
import axios from "axios";

interface ClassStream {
  id: number;
  name: string;
  formLevel: number;
}

export default function ClassStream() {
  const [streams, setStreams] = useState<ClassStream[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/stream")
      .then((res) => setStreams(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Class Streams</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Form Level</th>
          </tr>
        </thead>
        <tbody>
          {streams.map((stream) => (
            <tr key={stream.id}>
              <td>{stream.name}</td>
              <td>{stream.formLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}