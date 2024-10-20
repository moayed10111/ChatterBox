import { Schema, model, ObjectId } from "mongoose";

import Reaction from "./Reaction.js";

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: ObjectId;
  reactions: (typeof Reaction)[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },

  {
    toJSON: { virtuals: true },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = model<IThought>("Thought", thoughtSchema);

export default Thought;
