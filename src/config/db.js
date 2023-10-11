// file path: "./src/config/db";
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

module.exports = db;
