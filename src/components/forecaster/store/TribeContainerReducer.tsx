import { AnyAction } from "@reduxjs/toolkit"
import {
    CHANGE_SELECTED_TRIBES,
    CHANGE_REPLY_TYPE,
    CHANGE_FORECAST_HORIZON,
    CHANGE_TILE,
    CHANGE_POSITIONS_FILTER,
    CHANGE_LEGENDS
} from './Actions'


export interface TacticalForecastState extends TribeContainerState {
    replyType: string
}

export interface StrategicForecastState extends TribeContainerState {
    forecastHorizon: string
    tile: number
    positionsFilter: Array<string>
    legendsOnlyLegends: Array<string>
}

interface TribeContainerState {
    tribeId: string
}


export const INITIAL_TACTICAL_FORECAST_STATE: TacticalForecastState = {
    tribeId: '',
    replyType: ''
}

export const INITIAL_STRATEGIC_FORECAST_STATE: StrategicForecastState = {
    tribeId: '',
    forecastHorizon: '',
    tile: 4,
    positionsFilter: Array<string>(),
    legendsOnlyLegends: Array<string>()
}


export const TacalForecastReducer = (state: Array<TacticalForecastState> = Array<TacticalForecastState>(), action: AnyAction): Array<TacticalForecastState> => {
    return TribeContainerReducer(state, action, INITIAL_TACTICAL_FORECAST_STATE)
}

export const StrategicForecastReducer = (state: Array<StrategicForecastState> = Array<StrategicForecastState>(), action: AnyAction): Array<StrategicForecastState> => {
    return TribeContainerReducer(state, action, INITIAL_STRATEGIC_FORECAST_STATE)
}


function TribeContainerReducer<T extends TribeContainerState>(
    state: Array<T>,
    action: AnyAction,
    initialState: T
): Array<T> {
    switch (action.type) {
        case CHANGE_SELECTED_TRIBES:
            const selectedTribes = action.payload
            const currentTribeContainersStates = [...state]
            for (const tribe of selectedTribes) {
                if (currentTribeContainersStates.find(x => x.tribeId === tribe.id) === undefined) {
                    currentTribeContainersStates.push({ ...initialState, tribeId: tribe.id })
                }
            }
            console.log('CHANGE_SELECTED_TRIBES', currentTribeContainersStates)
            return currentTribeContainersStates

        case CHANGE_REPLY_TYPE:
            return updateTribeContainersStates(action.payload.tribeId, state, (x) => { return { ...x, replyType: action.payload.data } })

        case CHANGE_FORECAST_HORIZON:
            return updateTribeContainersStates(action.payload.tribeId, state, (x) => { return { ...x, forecastHorizon: action.payload.data } })

        case CHANGE_TILE:
            return updateTribeContainersStates(action.payload.tribeId, state, (x) => { return { ...x, tile: action.payload.data } })

        case CHANGE_POSITIONS_FILTER:
            return updateTribeContainersStates(action.payload.tribeId, state, (x) => { return { ...x, positionsFilter: action.payload.data } })

        case CHANGE_LEGENDS:
            return updateTribeContainersStates(action.payload.tribeId, state, (x) => { return { ...x, positionsFilter: action.payload.data } })
        default:
            return state
    }
}

function updateTribeContainersStates<T extends TribeContainerState>(tribeId: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
    return state.map((x) => { return x.tribeId === tribeId ? replaceState(x) : x })
}
