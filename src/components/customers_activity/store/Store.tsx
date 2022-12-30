import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../common/LocalStorage'
import { CustomersActivityReducer } from './CustomersActivityReducer'
import { SetsReducer } from './SetsReducer'
import { ViewStateReducer } from '../../common/store/state/Reducers'
import { initMissingCustomersActivityProperties } from './StoreStateMissingPropertiesInitializator'
import { initMissingCustomersActivitySetsProperties } from './StoreStateMissingPropertiesInitializator'


const currentStateKey = 'current_customers_activity_state_v1'


export const customersActivityStore = configureStore({
    reducer: {
        customersActivity: CustomersActivityReducer,
        customersActivitySets: SetsReducer,
        viewState: ViewStateReducer,
    },
    preloadedState: loadValidState()
})

function loadValidState() {
    const storedState = loadState(currentStateKey)
    if (storedState !== undefined) {
        initMissingCustomersActivityProperties(storedState.customersActivity)
        initMissingCustomersActivitySetsProperties(storedState.customersActivitySets)
    }
    return storedState
}


customersActivityStore.subscribe(() => {
    saveState(customersActivityStore.getState(), currentStateKey);
});


export type CustomersActivityStore = ReturnType<typeof customersActivityStore.getState>
export type CustomersActivityDispatch = typeof customersActivityStore.dispatch
