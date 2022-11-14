import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { ForecasterState, TribeContainerState, Payload } from './Interfaces'
import { INITIAL_FORECASTER_STATE } from './InitialStates'
import updateTribeContainersStates from './UpdateTribeContainersStates'

const CHANGE_REPLY_TYPE = 'tactical_forecast/change_reply_type'
export const changeReplyType = (replyType: Payload<string>): PayloadAction<Payload<string>> => {
    return {
        type: CHANGE_REPLY_TYPE,
        payload: replyType
    }
}

export const TacalForecastReducer = (state: ForecasterState = INITIAL_FORECASTER_STATE, action: AnyAction): ForecasterState => {
    switch (action.type) {
        case CHANGE_REPLY_TYPE:
            const payload: Payload<string> = action.payload
            return {
                ...state,
                currentTribeContainers: updateTribeContainersStates(
                    payload.tribeId,
                    state.currentTribeContainers,
                    (currState: TribeContainerState) => {
                        return {
                            ...currState,
                            tacticalForecastState: {
                                ...currState.tacticalForecastState,
                                replyType: payload.data
                            }
                        }
                    }
                )
            }
        default:
            return state
    }
}