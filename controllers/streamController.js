import prisma from "../prismaClient.js";

export const getStreams = async (req, res) => {
  const streams = await prisma.classStream.findMany({
    include: { students: true },
  });
  res.json(streams);
};

export const createStream = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }

  try {
    const stream = await prisma.classStream.create({ data: { name } });
    res.json(stream);
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(409).json({ error: "A stream with that name already exists" });
    }
    throw err;
  }
};
