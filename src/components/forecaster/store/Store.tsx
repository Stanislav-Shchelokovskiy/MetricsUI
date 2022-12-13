import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadState, saveState } from '../../common/LocalStorage'
import { ForecasterReducer } from './ForecasterReducer'
import { ForecasterItemsReducer, TacticalForecastReducer, StrategicForecastReducer } from './TribeContainerReducer'


const forecasterStateKey = 'current_forecaster_state_v1.0.1'

export const forecasterStore = configureStore({
    reducer: {
        forecaster: ForecasterReducer,
        tacticalForecast: TacticalForecastReducer,
        strategicForecast: StrategicForecastReducer,
        selectedForecastItems: ForecasterItemsReducer,
    },
    preloadedState: loadState(forecasterStateKey)
})


forecasterStore.subscribe(() => {
    saveState(forecasterStore.getState(), forecasterStateKey);
});


export type ForecasterStore = ReturnType<typeof forecasterStore.getState>
export type ForecasterDispatch = typeof forecasterStore.dispatch


export const useForecasterDispatch: () => ForecasterDispatch = useDispatch
export const useForecasterSelector: TypedUseSelectorHook<ForecasterStore> = useSelector
