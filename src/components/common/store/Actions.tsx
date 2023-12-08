import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../Typing'

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

export const DECOMPOSE_VALUES = 'decompose_values'
export interface ValuesDecomposition {
    values: Array<any>
    displaySelector: string
    valueSelector: string
}
export const decomposeValues = getAction<ValuesDecomposition>(DECOMPOSE_VALUES)
