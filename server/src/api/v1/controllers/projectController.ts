import { prisma } from '../../../server'
import { ERRORS } from '../interfaces/errors';


export async function create(name: string, authorId: string) {
  const countSameProject = await prisma.project.count({ where: { name, authorId } });
  if (countSameProject > 0) { return new ERRORS.ObjectAlreadyExistsError(["name", "authorId"]); }

  const newProject = await prisma.project.create({
    data: { name, authorId }
  });
  return newProject;
}

export async function getFromUser(authorId: string) {
  return await prisma.project.findMany({
    where: { authorId }
  })
};

export async function getById(id: string, authorId: string) {
  return await prisma.project.findFirst({
    where: { id, authorId },
  })
};