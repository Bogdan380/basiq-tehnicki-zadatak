import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    user: false,
    connection: false,
    transactions: false,
    connectError: false,
    userError: false,
    transactionsError: false,
  },
  reducers: {
    creatingUser: (state) => {
      state.user = true;
      state.connection = false;
      state.transactions = false;
      state.connectError = false;
      state.userError = false;
      state.transactionsError = false;
    },
    connecting: (state) => {
      state.user = false;
      state.connection = true;
      state.transactions = false;
      state.connectError = false;
      state.userError = false;
      state.transactionsError = false;
    },
    fetchingTransactions: (state) => {
      state.user = false;
      state.connection = false;
      state.transactions = true;
      state.connectError = false;
      state.userError = false;
      state.transactionsError = false;
    },
    fetchedData: (state) => {
      state.user = false;
      state.connection = false;
      state.transactions = false;
      state.connectError = false;
      state.userError = false;
      state.transactionsError = false;
    },
    connectionError: (state) => {
      state.user = false;
      state.connection = false;
      state.transactions = false;
      state.connectError = true;
      state.userError = false;
      state.transactionsError = false;
    },
    userError: (state) => {
      state.user = false;
      state.connection = false;
      state.transactions = false;
      state.connectError = false;
      state.userError = true;
      state.transactionsError = false;
    },
    transactionsError: (state) => {
      state.user = false;
      state.connection = false;
      state.transactions = false;
      state.connectError = false;
      state.userError = false;
      state.transactionsError = true;
    },
  },
});

export const {
  creatingUser,
  connecting,
  fetchingTransactions,
  fetchedData,
  connectionError,
  userError,
  transactionsError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
