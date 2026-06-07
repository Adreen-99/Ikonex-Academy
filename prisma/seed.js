import prisma from "../prismaClient.js";

async function main() {
  // Clear existing data (optional but useful for dev)
  await prisma.score.deleteMany();
  await prisma.student.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.classStream.deleteMany();

  // Create Streams
  const streamA = await prisma.classStream.create({
    data: { name: "Form 1A" },
  });

  const streamB = await prisma.classStream.create({
    data: { name: "Form 1B" },
  });

  // Create Subjects
  const math = await prisma.subject.create({ data: { name: "Mathematics" } });
  const english = await prisma.subject.create({ data: { name: "English" } });
  const science = await prisma.subject.create({ data: { name: "Science" } });

  // Create Students
  const student1 = await prisma.student.create({
    data: {
      admissionNumber: "ADM001",
      firstName: "John",
      lastName: "Doe",
      classStreamId: streamA.id,
    },
  });

  const student2 = await prisma.student.create({
    data: {
      admissionNumber: "ADM002",
      firstName: "Mary",
      lastName: "Wanjiku",
      classStreamId: streamB.id,
    },
  });

  // Create Scores
  await prisma.score.createMany({
    data: [
      {
        studentId: student1.id,
        subjectId: math.id,
        assessmentType: "Midterm",
        score: 78,
      },
      {
        studentId: student1.id,
        subjectId: english.id,
        assessmentType: "Midterm",
        score: 85,
      },
      {
        studentId: student2.id,
        subjectId: science.id,
        assessmentType: "Midterm",
        score: 90,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });