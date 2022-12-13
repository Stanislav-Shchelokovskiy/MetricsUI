import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loadState, saveState } from './LocalStorage'
import { ForecasterReducer } from '../forecaster/store/ForecasterReducer'
import { TacticalForecastReducer, StrategicForecastReducer } from '../forecaster/store/TribeContainerReducer'
import { ForecasterItemsReducer } from '../forecaster/store/TribeContainerReducer'
import { CustomersActivityReducer } from '../customers_activity/store/CustomersActivityReducer'
import { SetsReducer } from '../customers_activity/store/SetsReducer'


const currentStateKey = 'stat_app_current_state_v_1_0_1'


export const store = configureStore({
    reducer: {
        /*****FORECASTER*****/
        forecaster: ForecasterReducer,
        tacticalForecast: TacticalForecastReducer,
        strategicForecast: StrategicForecastReducer,
        selectedForecastItems: ForecasterItemsReducer,
        /*****CUSTOMERS_ACTIVITY*****/
        customersActivity: CustomersActivityReducer,
        customersActivitySets: SetsReducer,
    },
    preloadedState: loadState(currentStateKey)
})


store.subscribe(() => {
    saveState(store.getState(), currentStateKey);
});


export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector
