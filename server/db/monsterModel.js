import mongoose from "mongoose";

const monsterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  eyes: {
    type: Number,
  },
  color: {
    type: String,
  },
  img: {
    type: String,
  },
});

export const monsterModel = mongoose.model("Monster", monsterSchema);

