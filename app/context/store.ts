import { configureStore } from "@reduxjs/toolkit";
import monsterReducer from "./monsterSlice";
import postReducer from "./postSlice";

export const store = configureStore({
  reducer: {
    monster: monsterReducer,
    post: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
