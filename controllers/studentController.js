import prisma from "../prismaClient.js";

export const getStudents = async (req, res) => {
  const students = await prisma.student.findMany({
    include: { classStream: true, scores: true },
  });
  res.json(students);
};

export const createStudent = async (req, res) => {
  const { admissionNumber, firstName, lastName, classStreamId } = req.body;

  if (!admissionNumber || !firstName || !lastName || !classStreamId) {
    return res.status(400).json({
      error: "admissionNumber, firstName, lastName, and classStreamId are required",
    });
  }

  const student = await prisma.student.create({
    data: {
      admissionNumber,
      firstName,
      lastName,
      classStreamId: Number(classStreamId),
    },
  });
  res.json(student);
};
