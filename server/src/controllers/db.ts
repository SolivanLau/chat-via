import { PrismaClient } from '@prisma/client';

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
