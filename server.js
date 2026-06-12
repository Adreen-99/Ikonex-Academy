import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import streamRoutes from "./routes/streamRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ikonex-academy-opal.vercel.app"
  ]
}));

app.use(express.json());

app.use("/student", studentRoutes);
app.use("/subject", subjectRoutes);
app.use("/stream", streamRoutes);
app.use("/score", scoreRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
