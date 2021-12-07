import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  gapiLog,
  gapiLogO,
  login,
  logout,
  updateMail,
  updatePass,
  updateProf,
} from "../authenticationAPI";

export interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string;
}

export interface userState {
  value: UserProfile;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: userState = {
  value: {
    displayName: "",
    email: "",
    photoURL: "",
  },
  isLoading: true,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const gapiLogin = createAsyncThunk(
  "authentication/GapiLogin",
  async () => {
    const response = await gapiLog();
    return response;
  }
);

export const gapiLogOut = createAsyncThunk(
  "authentication/GapiLogout",
  async () => {
    const response = await gapiLogO();
    return response;
  }
);

export const loginFirebase = createAsyncThunk(
  "authentication/Login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login(email, password);

    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const logoutFirebase = createAsyncThunk(
  "authentication/Logout",
  async () => {
    const response = await logout();
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateProfileFirebase = createAsyncThunk(
  "authentication/UpdateProfile",
  async ({ info }: { info: { name: string; photo: string } }) => {
    const response = await updateProf(info);
    console.log(response);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const updateEmailFirebase = createAsyncThunk(
  "authentication/UpdateEmail",
  async (email: string) => {
    const response = await updateMail(email);
    return response;
  }
);

export const updatePasswordFirebase = createAsyncThunk(
  "authentication/UpdatePassword",
  async (password: string) => {
    const response = await updatePass(password);
    return response;
  }
);

export const userSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.value = {
        displayName: action.payload?.displayName || "",
        email: action.payload?.email || "",
        photoURL: action.payload?.photoURL || "",
      };
      state.isLoading = false;
    },
    setSuccess: (state, action) => {
      state.value = { ...state.value };
      state.isLoading = false;
      state.isSuccess = action.payload;
      state.isError = false;
      state.errorMessage = "";
    },
    setError: (state, action) => {
      state.value = { ...state.value };
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = action.payload.status;
      state.errorMessage = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFirebase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = {
          displayName: action.payload.user?.displayName || "",
          email: action.payload.user?.email || "",
          photoURL: action.payload.user?.photoURL || "",
        };
      })
      .addCase(loginFirebase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(gapiLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gapiLogin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(gapiLogin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(gapiLogOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gapiLogOut.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(gapiLogOut.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateProfileFirebase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = {
          ...state.value,
          displayName: action.payload.displayName || "",
          photoURL: action.payload.photoURL || "",
        };
        state.isSuccess = action.payload?.status ? true : false;
        state.isError = action.payload?.status ? false : true;
        state.errorMessage = "";
      })
      .addCase(updateProfileFirebase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutFirebase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = {
          email: "",
          photoURL: "",
          displayName: "",
        };
        state.errorMessage = "";
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(logoutFirebase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateEmailFirebase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmailFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = {
          ...state.value,
          email: String(action.payload.email) || state.value.email,
        };
        state.isSuccess = action.payload?.status ? true : false;
        state.isError = action.payload?.status ? false : true;
        state.errorMessage = action.payload?.message;
      })
      .addCase(updateEmailFirebase.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePasswordFirebase.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePasswordFirebase.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = {
          ...state.value,
        };
        state.isSuccess = action.payload?.status ? true : false;
        state.isError = action.payload?.status ? false : true;
        state.errorMessage = action.payload?.message;
      })
      .addCase(updatePasswordFirebase.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setCurrentUser, setSuccess, setError } = userSlice.actions;

export default userSlice.reducer;
