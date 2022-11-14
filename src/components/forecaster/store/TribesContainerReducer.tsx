import { AnyAction } from "@reduxjs/toolkit"
import { Tribe } from "../Tribe"

export const SELECTED_TRIBES_CHANGE = 'forecaster/selected_tribes_change'

export interface TribesTribeContainerState {
    tribes: Array<Tribe>
}

export const ForecasterSettingsReducer = (state: TribesTribeContainerState | null = null, action: AnyAction): TribesTribeContainerState | null => {
    switch (action.type) {
        case SELECTED_TRIBES_CHANGE:
            return action.payload
        default:
            return state
    }
}