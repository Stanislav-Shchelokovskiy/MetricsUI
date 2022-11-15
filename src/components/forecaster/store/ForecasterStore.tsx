import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ForecasterReducer } from './ForecasterReducer'
import { TacalForecastReducer, StrategicForecastReducer } from './TribeContainerReducer'


export const store = configureStore({
    reducer: {
        forecaster: ForecasterReducer,
        tacticalForecast: TacalForecastReducer,
        strategicForecast: StrategicForecastReducer
    }
})


export type ForecasterStore = ReturnType<typeof store.getState>
export type ForecasterDispatch = typeof store.dispatch


export const useForecasterDispatch: () => ForecasterDispatch = useDispatch
export const useForecasterSelector: TypedUseSelectorHook<ForecasterStore> = useSelector