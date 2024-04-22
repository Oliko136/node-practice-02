import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import ctrlDecorator from "../helpers/ctrlDecorator.js";
import User from "../models/userModel.js";

const { JWT_SECRET } = process.env;

const auth = ctrlDecorator(async (req, res, next) => {
    const [type, token] = req.headers.authorization.split(" ");

    if (type !== "Bearer") {
        next(HttpError(401));
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findById(id);
    console.log(user);
    if (!user || !user.token || user.token !== token) {
        next(HttpError(401));
    }

    req.user = user;

    next();
})

export default auth;


