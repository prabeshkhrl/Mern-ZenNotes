// import express from "express"
import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import { connectDB } from "./config/db.js";
import path from "path"
import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors"
dotenv.config();
const app = express();
const __dirname = path.resolve()

//middleware
if(process.env.NODE_ENV !=="production"){
app.use(cors({origin:"http://localhost:5173"}))
}
app.use(express.json());// this middle ware allows us to access the json req body 
app.use(rateLimiter)
app.use("/api/notes", noteRoutes)

if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}



const PORT=process.env.PORT



connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("server started on PORT :5001");
})
});



