import { Tribe } from "../Tribe"
import {
    TacticalForecastState,
    StrategicForecastState,
    ForecasterState,
    TribeContainerState
} from './Interfaces'

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