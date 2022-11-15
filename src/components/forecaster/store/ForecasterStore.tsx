import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ForecasterReducer } from './ForecasterReducer'
import { TacalForecastReducer, StrategicForecastReducer } from './TribeContainerReducer'
import { ForecasterItemsReducer } from './ForecastItemsReducer'
import { loadState, saveState } from '../utils/LocalStorage'


export const store = configureStore({
    reducer: {
        forecaster: ForecasterReducer,
        tacticalForecast: TacalForecastReducer,
        strategicForecast: StrategicForecastReducer,
        selectedForecastItems: ForecasterItemsReducer
    },
    preloadedState: loadState()
})

store.subscribe(() => {
    saveState(store.getState());
});

export type ForecasterStore = ReturnType<typeof store.getState>
export type ForecasterDispatch = typeof store.dispatch


export const useForecasterDispatch: () => ForecasterDispatch = useDispatch
export const useForecasterSelector: TypedUseSelectorHook<ForecasterStore> = useSelector