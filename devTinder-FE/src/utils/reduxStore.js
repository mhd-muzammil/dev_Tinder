import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";


const reduxStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

if (typeof window !== "undefined") {
  window.__STORE__ = reduxStore;
}

export default reduxStore;