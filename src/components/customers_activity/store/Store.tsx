import { configureStore } from '@reduxjs/toolkit';
import { loadState, saveState } from '../../common/LocalStorage'
import { CustomersActivityReducer } from './CustomersActivityReducer'
import { SetsReducer } from './SetsReducer'
import { ViewStateReducer } from '../../common/store/state/Reducers'
import {
    containerValidator,
    setsValidator,
} from './StoreStateValidator'


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
    let storedState = loadState(currentStateKey)
    if (storedState !== undefined) {
        storedState.customersActivity = containerValidator(storedState)
        storedState.customersActivitySets = setsValidator(storedState)
    }
    return storedState
}

customersActivityStore.subscribe(() => {
    saveState(customersActivityStore.getState(), currentStateKey);
})

export function getShareableState(state: CustomersActivityStore) {
    return {
        customersActivity: state.customersActivity,
        customersActivitySets: state.customersActivitySets
    }
}


export type CustomersActivityStore = ReturnType<typeof customersActivityStore.getState>
export type CustomersActivityDispatch = typeof customersActivityStore.dispatch
export type CustomersActivityShareableState = ReturnType<typeof getShareableState>
