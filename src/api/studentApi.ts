import api from "./axios";
import { Student } from "../types/Student";

export const getStudents = () =>
  api.get<Student[]>("/students");

export const getStudent = (id: number) =>
  api.get<Student>(`/students/${id}`);

export const createStudent = (
  student: Omit<Student, "id">
) =>
  api.post("/students", student);

export const updateStudent = (
  id: number,
  student: Partial<Student>
) =>
  api.put(`/students/${id}`, student);

export const deleteStudent = (
  id: number
) =>
  api.delete(`/students/${id}`);