import { Tribe } from "../Tribe"

export interface TacticalForecastState {
    replyType: string
}

export interface StrategicForecastState {
    forecastHorizon: string
    tile: number
    positionsFilter: Array<string>
    legendsOnlyLegends: Array<string>
}

export interface TribeContainerState {
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


export interface Payload<T> {
    tribeId: string
    data: T
}
