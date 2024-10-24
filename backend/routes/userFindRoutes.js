import express from 'express';

import { finduserbyid } from '../Controllers/userController.js';
const app = express();

const router = express.Router();

router.get('/finduserbyid/:userId', finduserbyid);

export default router;