import Thought from "../models/Thought.js";
import { Request, Response } from "express";
import User from "../models/User.js";

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughtData = await Thought.find().select("-__v");
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thoughtData = await Thought.findById(req.params.id)
      .select("-__v")
      .populate("reactions", "-__v");

    if (!thoughtData) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thoughtData = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thoughtData._id } },
      { new: true }
    );
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
};


export const updateThought = async (req: Request, res: Response) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v");

    if (!thoughtData) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(thoughtData);
    } catch (err) {
    res.status(400).json(err);
    }
}


export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thoughtData = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!thoughtData) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json({message: "Thought deleted!"});
  } catch (err) {
    res.status(400).json(err);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!thoughtData) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
};


export const deleteReaction = async (req: Request, res: Response) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    ).select("-__v");

    if (!thoughtData) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
    res.json(thoughtData);
  } catch (err) {
    res.status(400).json(err);
  }
};