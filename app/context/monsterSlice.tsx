import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import data from "../utils/demoData.json";
import { Monster } from "../utils/types";

interface MonsterState {
  monsters: Monster[];
  currentMonster: Monster | null;
}

const initialState: MonsterState = {
  monsters: data.monsters,
  currentMonster: null,
};

const monsterSlice = createSlice({
  name: "monster",
  initialState,
  reducers: {
    addMonster: (state, action) => {
      state.monsters.push(action.payload);
    },
    switchCurrentMonster: (state, action) => {
      state.currentMonster = action.payload;
    },
  },
});

export const { addMonster, switchCurrentMonster } = monsterSlice.actions;

export default monsterSlice.reducer;
