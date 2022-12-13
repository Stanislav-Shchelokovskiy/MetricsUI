import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadState, saveState } from '../../common/LocalStorage'
import { CustomersActivityReducer } from './CustomersActivityReducer'
import { SetsReducer } from './SetsReducer'


const currentStateKey = 'current_customers_activity_state_v1.0.1'


export const customers_activity_store = configureStore({
    reducer: {
        customersActivity: CustomersActivityReducer,
        customersActivitySets: SetsReducer,
    },
    preloadedState: loadState(currentStateKey)
})


customers_activity_store.subscribe(() => {
    saveState(customers_activity_store.getState(), currentStateKey);
});


export type CustomersActivityStore = ReturnType<typeof customers_activity_store.getState>
export type CustomersActivityDispatch = typeof customers_activity_store.dispatch


export const useCustomersActivityDispatch: () => CustomersActivityDispatch = useDispatch
export const useCustomersActivitySelector: TypedUseSelectorHook<CustomersActivityStore> = useSelector
