import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../Interfaces'

export function getAction<T>(actionType: string): (value: T) => PayloadAction<T> {
    return (value: T) => {
        return {
            type: actionType,
            payload: value
        }
    }
}

export function getPayloadAction<T>(actionType: string): (value: Payload<string, T>) => PayloadAction<Payload<string, T>> {
    return getAction<Payload<string, T>>(actionType)
}
