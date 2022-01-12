import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import userReducer from "../features/user/userSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import appReducer from "../features/app/appSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    calendar: calendarReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
