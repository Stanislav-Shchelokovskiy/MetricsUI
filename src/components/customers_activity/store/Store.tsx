import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadState, saveState } from '../../common/LocalStorage'
import { CustomersActivityReducer } from './CustomersActivityReducer'
import { SetsReducer } from './SetsReducer'
import { ViewStateReducer } from '../../common/store/state/Reducer'


const currentStateKey = 'current_customers_activity_state_v1'


export const customersActivityStore = configureStore({
    reducer: {
        customersActivity: CustomersActivityReducer,
        customersActivitySets: SetsReducer,
        viewState: ViewStateReducer,
    },
    preloadedState: loadState(currentStateKey)
})


customersActivityStore.subscribe(() => {
    saveState(customersActivityStore.getState(), currentStateKey);
});


export type CustomersActivityStore = ReturnType<typeof customersActivityStore.getState>
export type CustomersActivityDispatch = typeof customersActivityStore.dispatch


export const useCustomersActivityDispatch: () => CustomersActivityDispatch = useDispatch
export const useCustomersActivitySelector: TypedUseSelectorHook<CustomersActivityStore> = useSelector