import { AnyAction } from "@reduxjs/toolkit"
import { Tribe } from "../Tribe"



export interface TribesContainerState {
    tribeContainers: Array<TribeContainerState>
}

export interface TacticalForecastState {
    tribeID: string
    incomeType: string
    lastUpdate: number
    replyTypes: Array<string>
    replyType: string
}

export interface StrategicForecastState {
    tribeID: string
    incomeType: string
    lastUpdate: number
    forecastHorizons: Array<string>
    forecastHorizon: string,
    tiles: Array<number>
    tile: number
}

export interface TribeContainerState {
    tribe: Tribe
    incomeType: string
    lastUpdate: number
    replyTypes: Array<string>
    defaultReplyType: string
    dailyForecastHorizons: Array<string>
    defaultDailyForecastHorizon: string
    tiles: Array<number>
    defaultTile: number
}

const tribeContainerStateDefault = {
    incomeTypes: Array<string>(),
    replyTypes: Array<string>(),
    tiles: Array<number>(),
    dailyForecastHorizons: Array<string>(),
    tribes: Array<Tribe>(),
    incomeType: '',
    defaultReplyType: '',
    defaultDailyForecastHorizon: '',
    defaultTile: 0,
    lastUpdate: Date.now()
}


const ADD_OR_UPDATE_TRIBE_CONTAINER = 'tribes_container/add_or_update_tribe_container'

export const addOrUpdateTribeContainer = (tribeContainerState: TribeContainerState) : AnyAction => {
    return {
        type: ADD_OR_UPDATE_TRIBE_CONTAINER,
        payload: tribeContainerState
    }
}

export const TribesContainerReducer = (state: TribesContainerState, action: AnyAction): TribesContainerState => {
    switch (action.type) {
        case ADD_OR_UPDATE_TRIBE_CONTAINER:
            const newState = {
                tribeContainers: Array<TribeContainerState>()
            }
            for (const tribeContainer of state.tribeContainers) {
                let stateToPush = tribeContainer
                if (stateToPush.tribe.id === action.payload.tribe.id) {
                    stateToPush = action.payload
                }
                newState.tribeContainers.push(stateToPush)
            }
            return newState
        default:
            return state
    }
}