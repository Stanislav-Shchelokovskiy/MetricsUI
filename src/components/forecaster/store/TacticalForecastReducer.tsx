import { AnyAction, PayloadAction } from "@reduxjs/toolkit"
import { TribeContainerState } from './Interfaces'
import { INITIAL_TRIBE_CONTAINER_STATE } from './InitialStates'


const CHANGE_REPLY_TYPE = 'tactical_forecast/change_reply_type'
export const changeReplyType = (replyType: string): PayloadAction<string> => {
    return {
        type: CHANGE_REPLY_TYPE,
        payload: replyType
    }
}

export const TacalForecastReducer = (state: TribeContainerState = INITIAL_TRIBE_CONTAINER_STATE, action: AnyAction): TribeContainerState => {
    switch (action.type) {
        case CHANGE_REPLY_TYPE:
            const replyType = action.payload
            return {
                ...state,
                tacticalForecastState: {
                    ...state.tacticalForecastState,
                    replyType: replyType
                }
            }
        default:
            return state
    }
}