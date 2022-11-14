import { configureStore } from "@reduxjs/toolkit";
import { ForecasterReducer } from './ForecasterReducer'


export const store = configureStore({
    reducer: {
        forecaster: ForecasterReducer,
    }
})

export type ForecasterState = ReturnType<typeof store.getState>
export type ForecasterDispatch = typeof store.dispatch