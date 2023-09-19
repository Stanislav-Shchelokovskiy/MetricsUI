import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Typing'

export const CHANGE_REPLY_TYPE = 'tactical_forecast/change_reply_type'
export const changeReplyType = (tribeId: string, replyType: string | undefined): PayloadAction<Payload<string, string | undefined>> => {
    return {
        type: CHANGE_REPLY_TYPE,
        payload: { stateId: tribeId, data: replyType }
    }
}
