import express from "express";
import { loginController, registerController } from "../Controllers/authController.js";
const app = express();

const router = express.Router();

// Router Register
router.post('/register', registerController);

// Routes Login
router.post('/login', loginController);


export default router;