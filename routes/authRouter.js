import express from 'express';
import { register, login, getCurrent, logout } from '../controllers/authControllers.js';
import auth from '../middlewares/auth.js';

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.get('/current', auth, getCurrent);

authRouter.post('/logout', auth, logout);

export default authRouter;