import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import predictionSlice from './Slices/predictionSlice';

export const store = configureStore({
    reducer:{
        prediction:predictionSlice,
        auth:authSlice
    }
})