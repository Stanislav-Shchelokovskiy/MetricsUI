import { AnyAction } from '@reduxjs/toolkit'
import {
    CHANGE_SELECTED_TRIBES,
    CHANGE_REPLY_TYPE,
    CHANGE_FORECAST_HORIZON,
    CHANGE_TILE,
    CHANGE_POSITIONS_FILTER,
    CHANGE_LEGENDS,
    EXPAND_FORECAST_ITEMS
} from './Actions'
import { Tribe } from '../../common/Interfaces'


export interface TacticalForecastState extends TribeContainerState {
    replyType: string
}

export interface StrategicForecastState extends TribeContainerState {
    forecastHorizon: string
    tile: number
    positionsFilter: Array<string>
    legendsOnlyLegends: Array<string>
}

export interface ForecasterItemsState extends TribeContainerState {
    expandedItems: Array<string>
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

export const INITIAL_FORECAST_ITEMS_EXPANDED_STATE = {
    tribeId: '',
    expandedItems: Array<string>()
}


export const ForecasterItemsReducer = (state: Array<ForecasterItemsState> = Array<ForecasterItemsState>(), action: AnyAction): Array<ForecasterItemsState> => {
    switch (action.type) {
        case CHANGE_SELECTED_TRIBES:
            return filterTribes(state, action, INITIAL_FORECAST_ITEMS_EXPANDED_STATE)
        case EXPAND_FORECAST_ITEMS:
            return updateTribeContainersStates(action.payload.stateId, state, (x) => { return { ...x, expandedItems: action.payload.data } })
        default:
            return state
    }
}


export const TacticalForecastReducer = (state: Array<TacticalForecastState> = Array<TacticalForecastState>(), action: AnyAction): Array<TacticalForecastState> => {
    switch (action.type) {
        case CHANGE_SELECTED_TRIBES:
            return filterTribes(state, action, INITIAL_TACTICAL_FORECAST_STATE)

        case CHANGE_REPLY_TYPE:
            return updateTribeContainersStates(action.payload.stateId, state, (x) => { return { ...x, replyType: action.payload.data !== undefined ? action.payload.data : INITIAL_TACTICAL_FORECAST_STATE.replyType } })
        default:
            return state
    }
}


export const StrategicForecastReducer = (state: Array<StrategicForecastState> = Array<StrategicForecastState>(), action: AnyAction): Array<StrategicForecastState> => {
    switch (action.type) {
        case CHANGE_SELECTED_TRIBES:
            return filterTribes(state, action, INITIAL_STRATEGIC_FORECAST_STATE)

        case CHANGE_FORECAST_HORIZON:
            return updateTribeContainersStates(action.payload.stateId, state, (x) => { return { ...x, forecastHorizon: action.payload.data !== undefined ? action.payload.data : INITIAL_STRATEGIC_FORECAST_STATE.forecastHorizon } })

        case CHANGE_TILE:
            return updateTribeContainersStates(action.payload.stateId, state, (x) => { return { ...x, tile: action.payload.data !== undefined ? action.payload.data : INITIAL_STRATEGIC_FORECAST_STATE.tile } })

        case CHANGE_POSITIONS_FILTER:
            return updateTribeContainersStates(action.payload.stateId, state, (x) => { return { ...x, positionsFilter: action.payload.data } })

        case CHANGE_LEGENDS:
            return updateTribeContainersStates(action.payload.stateId, state, (x) => { return { ...x, legendsOnlyLegends: action.payload.data } })
        default:
            return state
    }
}

function filterTribes<T extends TribeContainerState>(state: Array<T>, action: AnyAction, initialState: T): Array<T> {
    const selectedTribes: Array<Tribe> = action.payload
    const currentTribeContainersStates = [...state]
    for (const tribe of selectedTribes) {
        if (currentTribeContainersStates.find(x => x.tribeId === tribe.id) === undefined) {
            currentTribeContainersStates.push({ ...initialState, tribeId: tribe.id })
        }
    }
    return currentTribeContainersStates
}

function updateTribeContainersStates<T extends TribeContainerState>(tribeId: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
    return state.map((x) => { return x.tribeId === tribeId ? replaceState(x) : x })
}
