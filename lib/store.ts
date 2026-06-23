"use client";
import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "./reduxslice/bannerSlice";
import userReducer from "./reduxslice/userSlice";
import activeReducer from "./reduxslice/activeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      banner: bannerReducer,
      user: userReducer,
      active: activeReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
