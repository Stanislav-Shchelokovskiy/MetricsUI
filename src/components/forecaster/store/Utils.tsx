import { AnyAction } from '@reduxjs/toolkit'
import { Knot } from '../../common/Typing'

export interface Forecast {
    tentId: string
}

export function filterTents<T extends Forecast>(state: Array<T>, action: AnyAction, initialState: T): Array<T> {
    const selectedTents: Array<Knot> = action.payload
    const currentTentContainersStates = [...state]
    for (const tent of selectedTents) {
        if (currentTentContainersStates.find(x => x.tentId === tent.id) === undefined) {
            currentTentContainersStates.push({ ...initialState, tentId: tent.id })
        }
    }
    return currentTentContainersStates
}

export function updateTentContainersStates<T extends Forecast>(tentId: string, state: Array<T>, replaceState: (state: T) => T): Array<T> {
    return state.map((x) => { return x.tentId === tentId ? replaceState(x) : x })
}
