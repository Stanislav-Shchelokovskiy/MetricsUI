import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { loadState as loadBaseState, saveState } from '../../LocalStorage'
import { viewStateReducer, ViewState } from './Reducers';

const stateKey = 'stat_app_view'

export const STATE_SALT = 'CustomersActivity_'

export const viewStore = configureStore({
    reducer: viewStateReducer,
    preloadedState: loadState()
})

function loadState() {
    /* 
        Loading stateKeys implemented this way for backward compatibility.
        There are a lot of CustomersActivity states stored locally.
        We should find them and display.
    */
    const baseState: ViewState = loadBaseState(stateKey)
    const stateNames = new Set<string>()
    for (const key in localStorage) {
        if (key.includes(STATE_SALT)) {
            const stateName = key.replace(STATE_SALT, '')
            stateNames.add(stateName)
        }
    }

    return {
        ...baseState,
        stateKeys: [...stateNames]
    }
}


viewStore.subscribe(() => {
    saveState(viewStore.getState(), stateKey);
});


export type ViewStore = ReturnType<typeof viewStore.getState>
