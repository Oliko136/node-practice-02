import User from '../models/userModel.js';

export const findUser = ({ email }) => {
    return User.findOne({ email });
}

export const setToken = ({ email }, { token }) => {
    return User.findOneAndUpdate({ email }, { token }, { new: true });
}

export const registerUser = ({email, password}) => {
    return User.create({email, password});
}