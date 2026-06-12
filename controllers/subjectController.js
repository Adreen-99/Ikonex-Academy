import prisma from "../prismaClient.js";

export const getSubjects = async (req, res) => {
  const subjects = await prisma.subject.findMany();
  res.json(subjects);
};

export const createSubject = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  try {
    const subject = await prisma.subject.create({ data: { name } });
    res.json(subject);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "A subject with that name already exists" });
    }
    throw err;
  }
};
