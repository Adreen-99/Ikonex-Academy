import prisma from "../prismaClient.js";

export const getStudents = async (req, res) => {
  const students = await prisma.student.findMany({
    include: { classStream: true, scores: true },
  });
  res.json(students);
};

export const createStudent = async (req, res) => {
  const student = await prisma.student.create({
    data: req.body,
  });
  res.json(student);
};