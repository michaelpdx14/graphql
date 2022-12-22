import { Post } from './../models/Post';
import { Comment } from './../models/Comment';

const resolvers = {
    Query: {
      async getPosts() {
        const posts = await Post.find({});
  
        return posts;
      },
  
      async getComments() {
        const comments = await Comment.find({});
  
        return comments;
      }
    }
  };