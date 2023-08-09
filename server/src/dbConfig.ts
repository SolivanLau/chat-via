const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Connection to the database is established.');
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message);
  } finally {
    await prisma.$disconnect();
  }
};
