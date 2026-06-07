import prisma from "../prismaClient.js";

export const getSubjects = async (req, res) => {
  const subjects = await prisma.subject.findMany();
  res.json(subjects);
};

export const createSubject = async (req, res) => {
  const subject = await prisma.subject.create({
    data: req.body,
  });
  res.json(subject);
};