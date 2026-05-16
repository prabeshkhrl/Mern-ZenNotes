// import express from "express"
import express from "express"
import noteRoutes from "./routes/noteRoutes.js"
import { connectDB } from "./config/db.js";

import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors"
dotenv.config();
const app = express();

//middleware
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json());// this middle ware allows us to access the json req body 
app.use(rateLimiter)
app.use("/api/notes", noteRoutes)


const PORT=process.env.PORT



connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log("server started on PORT :5001");
})
});



