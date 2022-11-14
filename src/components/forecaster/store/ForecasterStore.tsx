import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ForecasterReducer } from './ForecasterReducer'
import { TacalForecastReducer } from './TacticalForecastReducer'
import { StrategicForecastReducer } from "./StrategicForecastReducer"
import { TribeContainerReducer } from "./TribeContainerReducer";


export const store = configureStore({
    reducer: {
        forecaster: ForecasterReducer,
        currentTribeContainers: TribeContainerReducer,
        // tacticalForecast: TacalForecastReducer,
        // strategicForecast: StrategicForecastReducer
    }
})

export type ForecasterState = ReturnType<typeof store.getState>
export type ForecasterDispatch = typeof store.dispatch

export const useForecasterDispatch: () => ForecasterDispatch = useDispatch
export const useForecasterSelector: TypedUseSelectorHook<ForecasterState> = useSelector