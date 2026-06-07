import express from "express";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import streamRoutes from "./routes/streamRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Routes only
app.use("/student", studentRoutes);
app.use("/subject", subjectRoutes);
app.use("/stream", streamRoutes);
app.use("/score", scoreRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});