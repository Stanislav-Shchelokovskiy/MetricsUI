import { configureStore } from "@reduxjs/toolkit";
import { ForecasterReducer } from './ForecasterReducer'
import { TacalForecastReducer } from './TacticalForecastReducer'
import { StrategicForecastReducer } from "./StrategicForecastReducer";


export const store = configureStore({
    reducer: {
        forecaster: ForecasterReducer,
        tacticalForecast: TacalForecastReducer,
        strategicForecast: StrategicForecastReducer
    }
})

export type ForecasterState = ReturnType<typeof store.getState>
export type ForecasterDispatch = typeof store.dispatch