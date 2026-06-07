import prisma from "../prismaClient.js";

export const getScores = async (req, res) => {
  const scores = await prisma.score.findMany({
    include: { student: true, subject: true },
  });
  res.json(scores);
};

export const createScore = async (req, res) => {
  const score = await prisma.score.create({
    data: req.body,
  });
  res.json(score);
};