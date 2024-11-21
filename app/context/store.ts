import { configureStore } from "@reduxjs/toolkit";
import monsterReducer from "./MonsterSlice";

export const store = configureStore({
  reducer: {
    monster: monsterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
