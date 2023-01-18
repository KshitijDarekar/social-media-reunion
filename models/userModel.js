import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", userSchema);
export default User;
