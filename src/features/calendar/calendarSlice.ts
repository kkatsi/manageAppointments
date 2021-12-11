import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItems, insertEvent } from "../calendarAPI";

export interface calendarItem {
  start: string;
  end: string;
  summary: string;
  description: string;
}

export interface calendarState {
  value: calendarItem[];
  isLoading: boolean;
}

export const initialState: calendarState = {
  value: [],
  isLoading: true,
};

export const getCalendarItems = createAsyncThunk(
  "calendar/GetCalendarItems",
  async () => {
    const response = await getItems();
    return response;
  }
);

export const insertCalendarEvent = createAsyncThunk(
  "calendar/InsertCalendarEvent",
  async ({
    start,
    end,
    description,
    summary,
  }: {
    start: string;
    end: string;
    description: string;
    summary: string;
  }) => {
    const response = await insertEvent(start, end, description, summary);
    return response;
  }
);

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCalendarItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCalendarItems.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(getCalendarItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(insertCalendarEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertCalendarEvent.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        // state.value = action.payload;
      })
      .addCase(insertCalendarEvent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// export const {} = calendarSlice.actions;

export default calendarSlice.reducer;
