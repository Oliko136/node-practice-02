import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ctrlDecorator from "../helpers/ctrlDecorator.js";
import HttpError from '../helpers/HttpError.js';
import { findUser, setToken, registerUser } from "../services/authServices.js";

const { JWT_SECRET } = process.env;


export const register = ctrlDecorator(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const result = await registerUser({ ...req.body, password: hashPassword });

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription
        }
    });
});

export const login = ctrlDecorator(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUser({ email });
    if (!user) {
        throw HttpError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw HttpError(401);
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "23h" });
    await setToken({ email }, { token });

    res.json({
        token,
        user: {
            email: user.email
        }
    })
    
});

export const getCurrent = ctrlDecorator(async (req, res) => {
    res.send(req.user);
});

export const logout = ctrlDecorator(async (req, res) => {
    
});