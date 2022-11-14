import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { Tribe } from "../Tribe"

export interface TacticalForecastState {
    tribeId: string
    incomeType: string
    lastUpdated: number
    replyType: string
}

export interface StrategicForecastState {
    tribeId: string
    incomeType: string
    lastUpdated: number
    forecastHorizon: string
    tile: number
    positionsFilter: Array<string>
    legendsOnlyLegends: Array<string>
}

const INITIAL_TACTICAL_FORECAST_STATE: TacticalForecastState = {
    tribeId: '',
    incomeType: '',
    lastUpdated: Date.now(),
    replyType: ''
}

const INITIAL_STRATEGIC_FORECAST_STATE: StrategicForecastState = {
    tribeId: '',
    incomeType: '',
    lastUpdated: Date.now(),
    forecastHorizon: '',
    tile: 4,
    positionsFilter: Array<string>(),
    legendsOnlyLegends: Array<string>()
}

const SELECT_TRIBES = 'tribe_container/select_tribes'
export const tribeContainerSelectTribes = (tribes: Array<Tribe>): PayloadAction<Array<Tribe>> => {
    return {
        type: SELECT_TRIBES,
        payload: tribes
    }
}

const CHANGE_INCOME_TYPE = 'tribe_container/change_income_type'
export const tribeContainerChangeIncomeType = (incomeType: string): PayloadAction<string> => {
    return {
        type: CHANGE_INCOME_TYPE,
        payload: incomeType
    }
}

const CHANGE_LAST_UPDATED = 'tribe_container/change_last_updated'
export const tribeContainerChangeLastUpdated = (): PayloadAction<number> => {
    return {
        type: CHANGE_LAST_UPDATED,
        payload: Date.now()
    }
}

export const TribeContainerReducer = (state: Array<TribeContainerState> = INITIAL_STATE, action: AnyAction): Array<TribeContainerState> => {
    switch (action.type) {
        case SELECT_TRIBES:
            const selectedTribes = action.payload
            const currentTribeContainersStates = [...state]
            for (const tribe of selectedTribes) {
                if (currentTribeContainersStates.find(x => x.tribeId === tribe.id) === undefined) {
                    currentTribeContainersStates.push(INITIAL_TRIBE_CONTAINER_STATE)
                }
            }
            return currentTribeContainersStates

        case CHANGE_INCOME_TYPE:
            return state.map((x) => { return { ...x, incomeType: action.payload } })

        case CHANGE_LAST_UPDATED:
            return state.map((x) => { return { ...x, lastUpdated: action.payload } })

        default:
            return state
    }
}