import { Schema, model, Document, ObjectId } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
  friendCount: ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    {
      toJson: { virtuals: true },
      Id: false,
    },
  ],
});

userSchema.virtual("friendCount").get(function (this: IUser) {
  return this.friends.length;
});

const User = model<IUser>("User", userSchema);

export default User;
