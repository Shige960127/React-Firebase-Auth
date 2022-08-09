import { configureStore } from "@reduxjs/toolkit";
import user from "./user";

const store = configureStore({
  reducer: {
    user,
  },
});
console.log(store);

export type AppDispatch = typeof store.dispatch;
export default store;
