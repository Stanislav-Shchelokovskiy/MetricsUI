import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../common/LocalStorage'
// import { CustomersActivityReducer } from './CustomersActivityReducer'
// import { SetsReducer } from './SetsReducer'
import { ViewStateReducer } from '../../common/store/state/Reducers'
// import { validateCustomersActivityProperties } from './StoreStateValidator'
// import { validateCustomersActivitySetsProperties } from './StoreStateValidator'


const currentStateKey = 'cost_metrics'


export const costMetricsStore = configureStore({
    reducer: {
        // customersActivity: CustomersActivityReducer,
        // customersActivitySets: SetsReducer,
        viewState: ViewStateReducer,
    },
    preloadedState: loadValidState()
})

function loadValidState() {
    const storedState = loadState(currentStateKey)
    if (storedState !== undefined) {
        // validateCustomersActivityProperties(storedState.customersActivity)
        // validateCustomersActivitySetsProperties(storedState.customersActivitySets)
    }
    return storedState
}


costMetricsStore.subscribe(() => {
    saveState(costMetricsStore.getState(), currentStateKey);
});


export type CostMetricsStore = ReturnType<typeof costMetricsStore.getState>
export type CostMetricsDispatch = typeof costMetricsStore.dispatch
