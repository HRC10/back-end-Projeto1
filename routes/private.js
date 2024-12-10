import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json(users)


  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro no servidor, tente mais tarde!" });
  }
});

export default router