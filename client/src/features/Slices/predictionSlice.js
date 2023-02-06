import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  predictions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new prediction
export const makePrediction = createAsyncThunk(
  "prediction/create",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/predict/", data);
      return response.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get results
export const getResults = createAsyncThunk(
  "prediction/results",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/predict/");
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(makePrediction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makePrediction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.predictions.push(action.payload);
      })
      .addCase(makePrediction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.predictions = action.payload;
      })
      .addCase(getResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = predictionSlice.actions;
export default predictionSlice.reducer;
