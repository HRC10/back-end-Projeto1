import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization 
    const JWT_SECRET = process.env.JWT_SECRET
    if (!token){
        return res.status(401).json({message: "acesso negado, sem token!"})
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET)

    }catch(err){
        return res.status(401).json({message: "Token inválido!!"})

    }
    next()
}

export default auth