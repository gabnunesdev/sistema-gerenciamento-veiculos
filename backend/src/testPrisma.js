require("dotenv").config();
const { PrismaClient } = require("./generated/prisma");


const prisma = new PrismaClient();

async function testConnection() {
  try {
    const users = await prisma.user.findMany();
    console.log("Conectado ao banco com sucesso! Usuários:", users);
  } catch (error) {
    console.error("Erro ao conectar:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
