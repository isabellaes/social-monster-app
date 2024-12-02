import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post, PostComment } from "../utils/types";
import { getPosts } from "../utils/api";

type newComment = {
  postId: string;
  comment: PostComment;
};
interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

export const fetchPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: string }
>("posts/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await getPosts();
    return response;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    addComment: (state, action: PayloadAction<newComment>) => {
      const post = state.posts.find((p) => p._id === action.payload.postId);
      if (post) {
        const index = state.posts.indexOf(post);
        state.posts[index].comments.push(action.payload.comment);
      }
    },
    addLike: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p._id === action.payload);
      if (post) {
        const index = state.posts.indexOf(post);
        state.posts[index].likes += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const { addPost, addComment, addLike } = postSlice.actions;

export default postSlice.reducer;
