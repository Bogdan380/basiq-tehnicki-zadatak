import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "params",
  version: 1,
  storage,
};

export default persistConfig;
