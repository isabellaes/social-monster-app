import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../utils/demoData.json";
import { Post } from "../utils/types";

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
  },
});

export const { addPost } = postSlice.actions;

export default postSlice.reducer;
