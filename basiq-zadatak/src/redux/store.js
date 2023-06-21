import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./notifications";
import paramsReducer from "./params";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistedReducer } from "./params";

const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    params: paramsReducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

export { persistor };
export default store;
