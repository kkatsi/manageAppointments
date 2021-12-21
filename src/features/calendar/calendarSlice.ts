import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteEvent,
  getItems,
  insertEvent,
  updateEvent,
} from "../calendarAPI";

export interface calendarItem {
  start: string;
  end: string;
  summary: string;
  description: string;
  id: string;
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
  async ({ max, min }: { max?: string; min?: string }) => {
    const response = await getItems(min || undefined, max || undefined);
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

export const updateCalendarEvent = createAsyncThunk(
  "calendar/UpdateCalendarEvent",
  async ({
    start,
    end,
    description,
    summary,
    id,
  }: {
    start: string;
    end: string;
    description: string;
    summary: string;
    id: string;
  }) => {
    const response = await updateEvent(start, end, description, summary, id);
    return response;
  }
);

export const deleteCalendarEvent = createAsyncThunk(
  "calendar/DeleteCalendarEvent",
  async ({ id }: { id: string }) => {
    const response = await deleteEvent(id);
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
        // console.log(state);
        state.isLoading = true;
      })
      .addCase(getCalendarItems.fulfilled, (state, action) => {
        console.log(state, action.payload);
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(getCalendarItems.rejected, (state, action) => {
        console.log(action.error);
        state.isLoading = false;
      })
      .addCase(insertCalendarEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertCalendarEvent.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        if (action.payload) state.value.push(action.payload);
      })
      .addCase(insertCalendarEvent.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCalendarEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCalendarEvent.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.value = state.value.map((event) =>
          event.id === action.payload?.id
            ? {
                ...event,
                start: action.payload.start,
                end: action.payload.end,
                description: action.payload.description,
                summary: action.payload.summary,
              }
            : event
        );
      })
      .addCase(updateCalendarEvent.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCalendarEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCalendarEvent.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.value = state.value.filter(
          (event) => event.id !== action.payload?.id
        );
      })
      .addCase(deleteCalendarEvent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default calendarSlice.reducer;
