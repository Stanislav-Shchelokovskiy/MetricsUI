import React from 'react';
import { createDispatchHook, ReactReduxContextValue } from 'react-redux'
import { createSubscription } from 'react-redux/es/utils/Subscription';
import { configureStore, PayloadAction } from '@reduxjs/toolkit';
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

const subscription = createSubscription(engineeringMetricsStore)
const engineeringMetricsContext = React.createContext<ReactReduxContextValue<any, PayloadAction<any>>>({
    store: engineeringMetricsStore,
    subscription: subscription
})
export const engineeringMetricsDispatch = createDispatchHook(engineeringMetricsContext)
