import { configureStore } from '@reduxjs/toolkit';
import predictionSlice from './Slices/predictionSlice';

export const store = configureStore({
    reducer:{
        prediction:predictionSlice
    }
})