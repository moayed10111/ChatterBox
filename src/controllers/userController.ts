import User from "../models/User.js";
import { Request, Response } from "express";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const userData = await User.find().populate("thoughts").populate("friends");
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userData = await User.findById(req.params.id).populate("thoughts").populate("friends");
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = await User.create(req.body);
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id);
    res.json(userData);
    } catch (err) {
    res.status(400).json(err);
    }
}


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userData = await User.findByIdAndDelete(req.params.id);
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const userData = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const userData = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
};