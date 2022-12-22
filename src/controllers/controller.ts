import { buildSchema } from 'graphql';
import { Post, PostInput } from './../models/Post';
import { Comment, CommentInput } from './../models/Comment';
import { QUERY_LIMIT } from './../../scripts/contants'

export const schema = buildSchema(`
  type Post {
    id: String,
    title: String,
    body: String,
    comments: [Comment!]!,
  }

  type Comment {
    id: String,
    name: String,
    email: String,
    body: String,
    post: Post,
  }

  input PostInput {
    title: String,
    body: String,
    comment: CommentInput,
  }

  input CommentInput {
    name: String,
    email: String,
    body: String,
    post: PostInput,
  }

  type Query {
    getPosts(offset: Int): [Post!]!
    getComments(offset: Int): [Comment!]!
  }

  type Mutation {
    createPost(input: PostInput): Post
    createComment(input: CommentInput): Comment
  }
`);

export const root = {

  async getPosts(offset: any) {
    console.log(`Offset: ${JSON.stringify({offset})}`);
    const posts = await Post.find({}).limit(QUERY_LIMIT * 1).skip((offset.offset - 1) * QUERY_LIMIT);
    await Promise.all(posts.map(async (post) => {
      const objectComment: any = [];
      await Promise.all(post.comments.map(async (commentId) => {
        const comment = await Comment.findById(commentId);
        objectComment.push(comment)
      }));
      post.comments = objectComment;
    }));
    
    console.log(` get post: ${JSON.stringify(posts)}`)
    return posts;
  },

  async getComments(offset: any) {
    console.log(`Offset: ${offset.offset}`);
    const comments = await Comment.find({}).limit(QUERY_LIMIT * 1).skip((offset.offset - 1) * QUERY_LIMIT);
    await Promise.all(comments.map(async (comment) => {
      const post: any = await Comment.findById(comment.post);
      comment.post = post;
    }));
    console.log(` get comment: ${JSON.stringify(comments)}`)
    return comments;
  },

  async createPost(post: PostInput) {
    const newPost = new Post(post);
    console.log(` New Post: ${newPost}`)
    const createdPost = await newPost.save();
    console.log(` Create Post: ${createdPost}`)
    if(post.comment){
      const newComment = new Comment(post.comment);
      console.log(`New Comment: ${newComment}`)
      await newComment.save();
    }
    return createdPost;
  },

  async createComment(comment: CommentInput) {
    const newComment = new Comment(comment);
    console.log(` New Comment: ${newComment}`)
    const createdComment = await newComment.save();
    if(comment.post){
      const newPost = new Post(comment.post);
      console.log(` New Post: ${newPost}`)
      await newPost.save();
    }
    console.log(` Create Comment: ${createdComment}`)
    return createdComment;
  },
};