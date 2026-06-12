import prisma from "../prismaClient.js";

export const getScores = async (req, res) => {
  const scores = await prisma.score.findMany({
    include: { student: true, subject: true },
  });
  res.json(scores);
};

export const createScore = async (req, res) => {
  const { studentId, subjectId, assessmentType, score } = req.body;

  if (!studentId || !subjectId || !assessmentType || score === undefined) {
    return res.status(400).json({
      error: "studentId, subjectId, assessmentType, and score are required",
    });
  }

  try {
    const created = await prisma.score.create({
      data: {
        studentId: Number(studentId),
        subjectId: Number(subjectId),
        assessmentType,
        score: Number(score),
      },
    });
    res.json(created);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: "A score for this student, subject, and assessment type already exists",
      });
    }
    throw err;
  }
};
