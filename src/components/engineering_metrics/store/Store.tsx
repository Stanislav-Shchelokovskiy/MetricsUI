import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../common/LocalStorage'
import { containerReducer } from './ContainerReducer'

const stateKey = 'engineering_metrics'

export const engineeringMetricsStore = configureStore({
    reducer: containerReducer,
    preloadedState: loadState(stateKey)
})


engineeringMetricsStore.subscribe(() => {
    saveState(engineeringMetricsStore.getState(), stateKey);
});


export type EngineeringMetricsStore = ReturnType<typeof engineeringMetricsStore.getState>
