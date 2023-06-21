import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";

export const paramsSlice = createSlice({
  name: "parameters",
  initialState: {
    userId: JSON.parse(localStorage.getItem("userId")),
    transactions: [],
  },
  reducers: {
    fetchedUser: (state, action) => {
      state.userId = action.payload;
    },
    fetchTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

const persistedReducer = persistReducer(persistConfig, paramsSlice.reducer);

export { persistedReducer };

export const { fetchedUser, fetchTransactions } = paramsSlice.actions;

export default paramsSlice.reducer;
