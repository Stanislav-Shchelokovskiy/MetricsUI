import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { ForecasterStore } from '../Store'
import { Forecaster, INITIAL_STATE } from './ForecasterReducer'

export function forecasterSelector(store: ForecasterStore) {
    return store.forecaster || INITIAL_STATE
}


function get_selector<T>(selector: (forecast: Forecaster) => T) {
    return createSelector(
        [forecasterSelector],
        (forecaster) => selector(forecaster)
    )
}

export const incomeTypeSelector = get_selector(forecast => forecast.incomeType)
export const tentIdsSelector = get_selector(forecast => forecast.tents?.map(tent => tent.id))
export const tentsSelector = get_selector(forecast => forecast.tents)
export const lastUpdatedSelector = get_selector(forecast => forecast.lastUpdated)
