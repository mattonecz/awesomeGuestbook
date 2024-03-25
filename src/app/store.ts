import { configureStore } from "@reduxjs/toolkit";
import appNameReducer from "./features/visitorsSlice";

const storageState = localStorage.getItem("guestbookReduxState");

const persistedState = storageState
  ? JSON.parse(storageState)
  : { visitors: [] };
console.log(persistedState);

export const store = configureStore({
  reducer: appNameReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("guestbookReduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
