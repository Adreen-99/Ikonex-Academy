import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Ikonex Academy</h1>

      <button
        onClick={() => navigate("/navbar")}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Enter System
      </button>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "200px",
          }}
        >
          <h3>Students</h3>
          <p>0</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "200px",
          }}
        >
          <h3>Subjects</h3>
          <p>0</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            width: "200px",
          }}
        >
          <h3>Streams</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}