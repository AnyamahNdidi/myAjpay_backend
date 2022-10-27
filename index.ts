import express, { Application, Response, Request } from "express"
import cors from "cors"
import db from "./utilis/db"
import user from "./router/userRouter"
import follow from "./router/following"
import wallet from "./router/walletRouter"
import history from "./router/historty"
 
const port: number = 5050
db;
const app: Application = express()

app.use(cors())
app.use(express.json())

app.use("/api/user", user)
app.use("/api/follow/user", follow)
app.use("/api/wallet", wallet) 
app.use("/api/wallet", history) 

app.get("/", (req:Request, res:Response):Response =>
{
    return res.status(200).json({message:"api is up and running "})
})

app.listen(port, ():void =>
{
    console.log("server is up an running")
})