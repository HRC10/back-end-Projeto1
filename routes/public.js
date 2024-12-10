import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

router.post("/login", async (req, res) => {
  try {
    const userinfo = await req.body;

    // verificando o user no bando de dados
    const user = await prisma.user.findUnique({
      where: { email: userinfo.email },
    });

    //verifica se ele existe no banco 
    if (!user){
        return res.status(500).json({message : "usuário nao encontrado!"})
    }

    // comparar se a senha está correta 
    const isMatch = await bcrypt.compare(userinfo.password, user.password)
    if (!isMatch){
        return res.status(400).json({message : "senha inválida!"})
    }
    const token = jwt.sign({id: user.id}, JWT_SECRET, {expiresIn: '1m'})

    return res.status(200).json(token)
  } catch {
    return res
      .status(500)
      .json({ message: "Erro no servidor, tente novamente!" });
  }
});

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const userDB = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
      },
    });

    res.status(201).json(userDB);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar, tente novamente!!" });
  }
});

export default router;

// hugo
// 14497256863
// mongodb+srv://Hugo:<db_password>@users.z21rt.mongodb.net/Users?retryWrites=true&w=majority&appName=Users
