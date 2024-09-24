import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import morgan from "morgan";
import connectDb from "../config/db.js";
import authRoutes from './routes/authRoutes.js';
const app = express()

dotenv.config();

// connecting the database
connectDb();

// middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));


//-----------------------//
// Routes
app.use('/api/v1/auth', authRoutes);

app.get('/', (req,res) => {
    res.send("Api is running: ");
    console.log("things are ok")
})


console.log(process.env.PORT)
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`server started on Port ${PORT}`));