import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
  likes: {
    type: Number,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Monster",
  },
  comments: [
    {
      text: {
        type: String,
      },
      authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Monster",
      },
    },
  ],
});

export const postModel = mongoose.model("Post", postSchema);
