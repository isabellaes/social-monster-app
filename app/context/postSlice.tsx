import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post, PostDTO } from "../utils/types";
import { getPosts, addComment, addLike, addPost } from "../utils/api";

type newComment = {
  postId: string;
  text: string;
  authorId: string;
};
interface PostState {
  posts: PostDTO[];
}

const initialState: PostState = {
  posts: [],
};

export const fetchPosts = createAsyncThunk<
  PostDTO[],
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

export const createNewPost = createAsyncThunk<
  PostDTO,
  Post,
  { rejectValue: string }
>("posts/addPost", async (data, { rejectWithValue }) => {
  try {
    const response = await addPost(data);
    return response;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

export const updateCommentsOnPost = createAsyncThunk<
  PostDTO,
  newComment,
  { rejectValue: string }
>("posts/updateComments", async (data, { rejectWithValue }) => {
  try {
    const response = await addComment(data);
    return response;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

export const updateLikesOnPost = createAsyncThunk<
  PostDTO,
  string,
  { rejectValue: string }
>("posts/updateLikes", async (data, { rejectWithValue }) => {
  try {
    const response = await addLike(data);
    return response;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });

    builder.addCase(updateCommentsOnPost.fulfilled, (state, action) => {
      state.posts = state.posts.map((p) => {
        if (p._id === action.payload._id) return action.payload;
        else return p;
      });
    });

    builder.addCase(updateLikesOnPost.fulfilled, (state, action) => {
      state.posts = state.posts.map((p) => {
        if (p._id === action.payload._id) return action.payload;
        else return p;
      });
    });

    builder.addCase(createNewPost.fulfilled, (state, action) => {
      state.posts = [...state.posts, action.payload];
    });
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
