import { createSelector } from '@reduxjs/toolkit'
import { MultisetContainerStoreEx } from '../Store'

export function nonShareableStateSelector(store: MultisetContainerStoreEx) {
    return store.nonShareable
}

export const favoriteMetricsSelector = createSelector([nonShareableStateSelector], state => state?.favoriteMetrics)
