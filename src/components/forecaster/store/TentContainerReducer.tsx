import { AnyAction } from '@reduxjs/toolkit'
import {
    CHANGE_SELECTED_TENTS,
    CHANGE_REPLY_TYPE,
    CHANGE_FORECAST_HORIZON,
    CHANGE_TILE,
    CHANGE_POSITIONS_FILTER,
    CHANGE_LEGENDS,
    EXPAND_FORECAST_ITEMS
} from './Actions'
import { Tribe } from '../../common/Interfaces'


export interface TacticalForecastState extends TentContainerState {
    replyType: string
}

export interface StrategicForecastState extends TentContainerState {
    forecastHorizon: string
    tile: number
    positionsFilter: Array<string>
    legendsOnlyLegends: Array<string>
}

export interface ForecasterItemsState extends TentContainerState {
    expandedItems: Array<string>
}

interface TentContainerState {
    tentId: string
}


export const INITIAL_TACTICAL_FORECAST_STATE: TacticalForecastState = {
    tentId: '',
    replyType: ''
}

export const INITIAL_STRATEGIC_FORECAST_STATE: StrategicForecastState = {
    tentId: '',
    forecastHorizon: '',
    tile: 4,
    positionsFilter: Array<string>(),
    legendsOnlyLegends: Array<string>()
}

export const INITIAL_FORECAST_ITEMS_EXPANDED_STATE = {
    tentId: '',
    expandedItems: Array<string>()
}


export const ForecasterItemsReducer = (state: Array<ForecasterItemsState> = Array<ForecasterItemsState>(), action: AnyAction): Array<ForecasterItemsState> => {
    switch (action.type) {
        case CHANGE_SELECTED_TENTS:
            return filterTents(state, action, INITIAL_FORECAST_ITEMS_EXPANDED_STATE)
        case EXPAND_FORECAST_ITEMS:
            return updateTentContainersStates(action.payload.stateId, state, (x) => { return { ...x, expandedItems: action.payload.data } })
        default:
            return state
    }
}


export const TacticalForecastReducer = (state: Array<TacticalForecastState> = Array<TacticalForecastState>(), action: AnyAction): Array<TacticalForecastState> => {
    switch (action.type) {
        case CHANGE_SELECTED_TENTS:
            return filterTents(state, action, INITIAL_TACTICAL_FORECAST_STATE)

        case CHANGE_REPLY_TYPE:
            return updateTentContainersStates(action.payload.stateId, state, (x) => { return { ...x, replyType: action.payload.data !== undefined ? action.payload.data : INITIAL_TACTICAL_FORECAST_STATE.replyType } })
        default:
            return state
    }
}


export const StrategicForecastReducer = (state: Array<StrategicForecastState> = Array<StrategicForecastState>(), action: AnyAction): Array<StrategicForecastState> => {
    switch (action.type) {
        case CHANGE_SELECTED_TENTS:
            return filterTents(state, action, INITIAL_STRATEGIC_FORECAST_STATE)

        case CHANGE_FORECAST_HORIZON:
            return updateTentContainersStates(action.payload.stateId, state, (x) => { return { ...x, forecastHorizon: action.payload.data !== undefined ? action.payload.data : INITIAL_STRATEGIC_FORECAST_STATE.forecastHorizon } })

        case CHANGE_TILE:
            return updateTentContainersStates(action.payload.stateId, state, (x) => { return { ...x, tile: action.payload.data !== undefined ? action.payload.data : INITIAL_STRATEGIC_FORECAST_STATE.tile } })

        case CHANGE_POSITIONS_FILTER:
            return updateTentContainersStates(action.payload.stateId, state, (x) => { return { ...x, positionsFilter: action.payload.data } })

        case CHANGE_LEGENDS:
            return updateTentContainersStates(action.payload.stateId, state, (x) => { return { ...x, legendsOnlyLegends: action.payload.data } })
        default:
            return state
    }
}

function filterTents<T extends TentContainerState>(state: Array<T>, action: AnyAction, initialState: T): Array<T> {
    const selectedTents: Array<Tribe> = action.payload
    const currentTentContainersStates = [...state]
    for (const tent of selectedTents) {
        if (currentTentContainersStates.find(x => x.tentId === tent.id) === undefined) {
            currentTentContainersStates.push({ ...initialState, tentId: tent.id })
        }
    }
    return currentTentContainersStates
}

function updateTentContainersStates<T extends TentContainerState>(tent_id: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
    return state.map((x) => { return x.tentId === tent_id ? replaceState(x) : x })
}
