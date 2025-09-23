import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./userSlice";


const reduxStore = configureStore({
    reducer: {
        user: userReducer
    },
});

if (typeof window !== "undefined") {
  window.__STORE__ = reduxStore;
}

export default reduxStore;