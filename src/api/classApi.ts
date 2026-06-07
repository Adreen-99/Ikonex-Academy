import api from "./axios";
import { ClassStream } from "../types/ClassStream";

export const getClassStreams = () =>
  api.get<ClassStream[]>("/class-streams");

export const createClassStream = (
  stream: Omit<ClassStream, "id">
) =>
  api.post("/class-streams", stream);