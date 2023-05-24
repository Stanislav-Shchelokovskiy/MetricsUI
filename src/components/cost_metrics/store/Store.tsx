import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../common/LocalStorage'
import { ContainerReducer } from './ContainerReducer'
import { SetsReducer } from './SetsReducer'
import { ViewStateReducer } from '../../common/store/state/Reducers'
import {
    containerValidator,
    setsValidator,
} from './StoreStateValidator'


const currentStateKey = 'cost_metrics'


export const costMetricsStore = configureStore({
    reducer: {
        container: ContainerReducer,
        sets: SetsReducer,
        viewState: ViewStateReducer,
    },
    preloadedState: loadValidState()
})

function loadValidState() {
    let storedState = loadState(currentStateKey)
    if (storedState !== undefined) {
        storedState.container = containerValidator(storedState)
        storedState.sets = setsValidator(storedState)
    }
    return storedState
}


costMetricsStore.subscribe(() => {
    saveState(costMetricsStore.getState(), currentStateKey);
})

export function getShareableState(state: CostMetricsStore) {
    return {
        container: state.container,
        sets: state.sets
    }
}


export type CostMetricsStore = ReturnType<typeof costMetricsStore.getState>
export type CostMetricsDispatch = typeof costMetricsStore.dispatch
export type CostMetricsShareableState = ReturnType<typeof getShareableState>
