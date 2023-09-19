import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../../Typing'
import { getPayloadAction } from '../../../Actions'

export function getValuesPayloadAction<T>(actionType: string): (value: Payload<string, Array<T>>) => PayloadAction<Payload<string, Array<T>>> {
    return getPayloadAction<Array<T>>(actionType)
}

export function getIncludePayloadAction(actionType: string): (value: Payload<string, boolean>) => PayloadAction<Payload<string, boolean>> {
    return getPayloadAction<boolean>(actionType)
}
