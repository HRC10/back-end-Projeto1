import express from "express";
import PublicRouter from "./routes/public.js"
import PrivateRouter from "./routes/private.js"
import auth from "./middleware/auth.js";
const server = express();
server.use(express.json());

server.use("/", PublicRouter)
server.use("/", auth, PrivateRouter)


server.listen(3000, () => {
    console.log("Server running!!")
})