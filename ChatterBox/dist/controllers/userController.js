import User from "../models/User.js";
export const getAllUsers = async (_req, res) => {
    try {
        const userData = await User.find().populate("thoughts").populate("friends");
        res.json(userData);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const getUserById = async (req, res) => {
    try {
        const userData = await User.findById(req.params.id)
            .populate("thoughts")
            .populate("friends");
        if (!userData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(userData);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const createUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).select("-__v");
        if (!userData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        res.json(userData);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const deleteUser = async (req, res) => {
    try {
        const userData = await User.findByIdAndDelete(req.params.id);
        if (!userData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
        }
        else {
            res.json({ userData, message: 'User deleted.' });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const addFriend = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(req.params.id, { $push: { friends: req.params.friendId } }, { new: true });
        res.json({ userData, message: 'Friend added.' });
    }
    catch (err) {
        res.status(400).json(err);
    }
};
export const deleteFriend = async (req, res) => {
    try {
        const userData = await User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.friendId } }, { new: true });
        res.json({ userData, message: 'Friend deleted.' });
    }
    catch (err) {
        res.status(400).json(err);
    }
};
