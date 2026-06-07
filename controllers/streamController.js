import prisma from "../prismaClient.js";

export const getStreams = async (req, res) => {
  const streams = await prisma.classStream.findMany({
    include: { students: true },
  });
  res.json(streams);
};

export const createStream = async (req, res) => {
  const stream = await prisma.classStream.create({
    data: req.body,
  });
  res.json(stream);
};