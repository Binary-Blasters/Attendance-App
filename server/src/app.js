import express, { text } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import classRoutes from "./routes/class.routes.js"
import attenDanceRoute from "./routes/attendance.routes.js"

const app = express()

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(cookieParser())

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/classes", classRoutes)
app.use("/api/v1/attendance", attenDanceRoute)

export {app}