import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Monster } from "../utils/types";
import { getMonsters } from "../utils/api";

interface MonsterState {
  monsters: Monster[];
  currentMonster: Monster | null;
}

const initialState: MonsterState = {
  monsters: [],
  currentMonster: null,
};

export const fetchMonsters = createAsyncThunk<
  Monster[],
  void,
  { rejectValue: string }
>("monsters/fetchMonsters", async (_, { rejectWithValue }) => {
  try {
    const response = await getMonsters();
    return response;
  } catch (error) {
    return rejectWithValue("Something went wrong");
  }
});

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
  extraReducers: (builder) => {
    builder.addCase(fetchMonsters.fulfilled, (state, action) => {
      state.monsters = action.payload;
    });
  },
});

export const { addMonster, switchCurrentMonster } = monsterSlice.actions;

export default monsterSlice.reducer;
