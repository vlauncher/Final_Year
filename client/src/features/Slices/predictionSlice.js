import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from 'react-toastify'

const initialState = {
  predictions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new prediction
export const createPrediction= createAsyncThunk(
  "prediction/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user["access"];
      const response = await axios.post("/api/predict/",data,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      toast.success('Predicton made')
      return response.data;
    } catch (error) {
      const message = error.response.data;
      console.log(message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get results
export const getResults = createAsyncThunk(
  "prediction/results",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user["access"];
      const response = await axios.get("/api/results/",{
        headers : {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(token)
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
      .addCase(createPrediction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPrediction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.predictions.push(action.payload);
      })
      .addCase(createPrediction.rejected, (state, action) => {
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
      })     
  },
});

export const { reset } = predictionSlice.actions;
export default predictionSlice.reducer;