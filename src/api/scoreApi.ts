import api from "./axios";
import { Score } from "../types/Score";

export const getScores = () =>
  api.get<Score[]>("/scores");

export const createScore = (
  score: Omit<Score, "id">
) =>
  api.post("/scores", score);

export const updateScore = (
  id: number,
  score: Partial<Score>
) =>
  api.put(`/scores/${id}`, score);