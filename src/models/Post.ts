import mongoose from "mongoose";

export interface PostInput {
  title: String,
  body: String,
  comment: {
    name: String,
    email: String,
    body: String,
  }
} 

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export const Post = mongoose.model("Post", postSchema);
