import mongoose from "mongoose";

export interface CommentInput {
  name: String,
  email: String,
  body: String,
  post :{
    title: String,
    body: String
  }
} 

const commentSchema = new mongoose.Schema({
  name: String,
  email: String,
  body: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

export const Comment = mongoose.model("Comment", commentSchema);
