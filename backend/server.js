import cors from 'cors';
import dotenv from "dotenv";
import express from 'express';
import http from 'http';
import morgan from "morgan";
import { Server } from 'socket.io';
import connectDb from "../config/db.js";
import authRoutes from './routes/authRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import postRoutes from './routes/postRoutes.js';
import userFindRoutes from './routes/userFindRoutes.js';

const app = express()

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST']
  },
});


// Listen for socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    // Handle incoming messages
    socket.on('sendMessage', (data) => {
      console.log('Message received on server:', data);
      io.to(data.chatId).emit('receiveMessage', data); // Broadcast message to the chat room
    });
  
    // Join a chat room
    socket.on('joinRoom', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat room: ${chatId}`);
    });
  
    // Disconnect
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

dotenv.config();

// connecting the database
connectDb();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//-----------------------//
// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/chats', conversationRoutes);
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/user', userFindRoutes);

app.get('/', (req,res) => {
    res.send("Api is running: ")
    console.log("things are ok")
})


console.log(process.env.PORT)
const PORT = process.env.PORT || 8080;
server.listen(PORT, console.log(`server started on Port ${PORT}`));