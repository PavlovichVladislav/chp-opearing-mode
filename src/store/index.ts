import { configureStore } from '@reduxjs/toolkit';
import yearTaskSlice from './slices/yearTaskSlice';

export const store = configureStore({
    reducer: {yearTaskSlice}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch