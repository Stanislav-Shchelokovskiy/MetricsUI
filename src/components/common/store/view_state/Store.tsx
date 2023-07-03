import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { loadState as loadBaseState, saveState } from '../../LocalStorage'
import { getViewStateReducer, ViewState } from './Reducers';

export function configureViewStore(stateKey: string, stateSalt: string) {
    const store = configureStore({
        reducer: getViewStateReducer(stateSalt),
        preloadedState: loadState()
    })

    function loadState(): ViewState {
        /* 
            Loading stateKeys implemented this way for backward compatibility.
            There are a lot of CustomersActivity states stored locally.
            We should find them and display.
        */
        const baseState: ViewState = loadBaseState(stateKey)
        const stateNames = new Set<string>()
        for (const key in localStorage) {
            if (key.includes(stateSalt)) {
                const stateName = key.replace(stateSalt, '')
                stateNames.add(stateName)
            }
        }

        return {
            ...baseState,
            salt: stateSalt,
            stateKeys: [...stateNames]
        }
    }


    store.subscribe(() => {
        saveState(store.getState(), stateKey);
    });

    return store
}
