import { PrismaClient, user } from '@prisma/client';
import { CustomApiError } from '../errors/customError';

const prisma = new PrismaClient();

export const dbAddUser = async (
  userName: string,
  email: string,
  uid: string
) => {
  const user = await prisma.user.create({
    data: {
      uid,
      userName,
      email,
    },
  });
  return user;
};

export const dbGetUsers = async (): Promise<user[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const dbGetSingleUser = async (uid: string): Promise<user | null> => {
  const singleUser = await prisma.user.findUnique({
    where: {
      uid: uid,
    },
  });

  return singleUser;
};
