import dotenv from "dotenv";
import express from 'express';
const app = express()

dotenv.config();

app.get('/', (req,res) => {
    res.send("Api is running: ");
    console.log("things are ok")
})


console.log(process.env.PORT)
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`server started on Port ${PORT}`)); 