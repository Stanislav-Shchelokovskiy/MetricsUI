import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../common/LocalStorage'
import { ForecasterReducer } from './forecaster/ForecasterReducer'
import { tacticalForecastsReducer } from './tactical_forecast/TacticalForecastsReducer';
import { forecasterItemsReducer } from './forecaster_items/ForecasterItemsReducer'
import { strategicForecastsReducer } from './strategic_forecast/StrategicForecastReducer';

const currentStateKey = 'forecaster'

export const forecasterStore = configureStore({
    reducer: {
        forecaster: ForecasterReducer,
        tacticalForecasts: tacticalForecastsReducer,
        strategicForecasts: strategicForecastsReducer,
        forecasterItems: forecasterItemsReducer,
    },
    preloadedState: loadState(currentStateKey)
})


forecasterStore.subscribe(() => {
    saveState(forecasterStore.getState(), currentStateKey);
});


export type ForecasterStore = ReturnType<typeof forecasterStore.getState>
