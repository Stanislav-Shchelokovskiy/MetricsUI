import React from 'react'
import { createSelector } from '@reduxjs/toolkit'
import { ForecasterStore } from '../Store'
import { ForecasterItems, INITIAL_STATE } from './ForecasterItemsReducer'

function selectedForecasterItemsSelector(store: ForecasterStore) {
    return store.forecasterItems
}
const tentIdSelector = (store: ForecasterStore, tentId: string) => tentId

function expandedItemSelector(forecasts: Array<ForecasterItems>, tentId: string) {
    return forecasts.find(x => x.tentId === tentId) || INITIAL_STATE
}

function get_selector<T>(selector: (forecast: ForecasterItems) => T) {
    return createSelector(
        [selectedForecasterItemsSelector, tentIdSelector],
        (forecast, tentId) => selector(expandedItemSelector(forecast, tentId))
    )
}

export const expandedItemsSelector = get_selector(forecast => forecast.expandedItems)
