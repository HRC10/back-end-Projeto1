import express from "express";
import PublicRouter from "./routes/public.js"
import PrivateRouter from "./routes/private.js"
import auth from "./middleware/auth.js";
import cors from "cors"


const server = express();
server.use(express.json());
server.use(cors())


server.use("/", PublicRouter)
server.use("/", auth, PrivateRouter)


server.listen(3000, () => {
    console.log("Server running!!")
})