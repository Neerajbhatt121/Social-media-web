import express from "express";
import { loginController, registerController } from "../Controllers/authController.js";
const app = express();

const router = express.Router();

// Router Register
router.post('/register', registerController);

// Routes Login
router.get('/login', loginController);


export default router;