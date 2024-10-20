import {Schema, model, Document, ObjectId} from "mongoose";

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: {
        reactionBody: string;
        username: string;
        createdAt: Date;
    }[]
    reactionCount: number;
    }

const ThoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            reactionBody: {
                type: String,
                required: true,
                min: 1,
                max: 280
            },
            username: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

ThoughtSchema.virtual("reactionCount").get(function(this: IThought) {
    return this.reactions.length;
});

const Thought = model<IThought>("Thought", ThoughtSchema);

export default Thought;