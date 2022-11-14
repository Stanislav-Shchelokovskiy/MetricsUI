import { configureStore } from "@reduxjs/toolkit";
import { ForecasterReducer } from './ForecasterReducer'
import { Tribe } from '../Tribe'


interface TacticalForecastState {
    replyType: string
}

interface StrategicForecastState {
    forecastHorizon: string
    tile: number
    positionsFilter: Array<string>
    legendsOnlyLegends: Array<string>
}

export interface TribeContainerState {
    tribeName: string
    tribeId: string
    incomeType: string
    lastUpdated: number
    tacticalForecastState: TacticalForecastState
    strategicForecastState: StrategicForecastState
}

export interface ForecasterState {
    incomeType: string
    lastUpdated: number
    selectedTribes: Array<Tribe>
    currentTribeContainersStates: Array<TribeContainerState>,
    homeTribeContainersStates: Array<TribeContainerState>
}

const INITIAL_TACTICAL_FORECAST_STATE: TacticalForecastState = {
    replyType: ''
}

const INITIAL_STRATEGIC_FORECAST_STATE: StrategicForecastState = {
    forecastHorizon: '',
    tile: 4,
    positionsFilter: Array<string>(),
    legendsOnlyLegends: Array<string>()
}

export const INITIAL_TRIBE_CONTAINER_STATE: TribeContainerState = {
    tribeName: '',
    tribeId: '',
    incomeType: '',
    lastUpdated: Date.now(),
    tacticalForecastState: INITIAL_TACTICAL_FORECAST_STATE,
    strategicForecastState: INITIAL_STRATEGIC_FORECAST_STATE
}

export const INITIAL_FORECASTER_STATE: ForecasterState = {
    incomeType: '',
    lastUpdated: Date.now(),
    selectedTribes: Array<Tribe>(),
    currentTribeContainersStates: Array<TribeContainerState>(),
    homeTribeContainersStates: Array<TribeContainerState>(),
}

const store = configureStore({
    reducer: {
        forecasterSettings: ForecasterReducer
    }
})

export type AppState = ReturnType<typeof store.getState>

export default store