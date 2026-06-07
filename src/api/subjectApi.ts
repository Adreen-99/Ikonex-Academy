import api from "./axios";
import { Subject } from "../types/Subject";

export const getSubjects = () =>
  api.get<Subject[]>("/subjects");

export const createSubject = (
  subject: Omit<Subject, "id">
) =>
  api.post("/subjects", subject);

export const updateSubject = (
  id: number,
  subject: Partial<Subject>
) =>
  api.put(`/subjects/${id}`, subject);

export const deleteSubject = (
  id: number
) =>
  api.delete(`/subjects/${id}`);