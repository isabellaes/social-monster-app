import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../utils/demoData.json";
import { Post, PostComment } from "../utils/types";

type newComment = {
  postId: number;
  comment: PostComment;
};
interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: data.posts,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    addComment: (state, action: PayloadAction<newComment>) => {
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        const index = state.posts.indexOf(post);
        state.posts[index].comments.push(action.payload.comment);
      }
    },
  },
});

export const { addPost, addComment } = postSlice.actions;

export default postSlice.reducer;
