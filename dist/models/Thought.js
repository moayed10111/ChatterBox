import { Schema, model } from "mongoose";
import Reaction from "./Reaction.js";
const thoughtSchema = new Schema({
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
}, {
    toJSON: { virtuals: true },
    id: false,
});
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
const Thought = model("Thought", thoughtSchema);
export default Thought;
