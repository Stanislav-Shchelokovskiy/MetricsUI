import { AnyAction } from '@reduxjs/toolkit'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_TRIBES,
    CHANGE_CUSTOMERS_GROUPS,
    CHANGE_TICKETS_TYPES,
    CHANGE_TICKETS_TAGS,
    CHANGE_REPLIES_TYPES,
    CHANGE_CONTROLS,
    CHANGE_FEATURES,
} from './Actions'

export interface SetState {
    title: string
    tribes: Array<string>
    customersGroups: Array<string>
    ticketsTags: Array<number>
    ticketsTypes: Array<number>
    repliesTypes: Array<string>
    controls: Array<string>
    features: Array<string>
}


export const INITIAL_SET_STATE: SetState = {
    title: '0',
    tribes: Array<string>(),
    customersGroups: Array<string>(),
    ticketsTags: Array<number>(),
    ticketsTypes: Array<number>(),
    repliesTypes: Array<string>(),
    controls: Array<string>(),
    features: Array<string>(),
}

const INTIAL_SETS_STATE: Array<SetState> = [INITIAL_SET_STATE]

export const SetsReducer = (state: Array<SetState> = INTIAL_SETS_STATE, action: AnyAction): Array<SetState> => {
    switch (action.type) {

        case ADD_SET:
            const baseSet = state.find(x => x.title === action.payload) || INITIAL_SET_STATE
            return [...state, { ...baseSet, title: GenerateNewSetTitle(state.map(x => x.title)) }]

        case REMOVE_SET:
            return state.filter(set => set.title !== action.payload)

        case CHANGE_TRIBES:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    tribes: action.payload.data,
                    controls: [],
                    features: [],
                }
            })

        case CHANGE_CUSTOMERS_GROUPS:
            return updateSetState(action.payload.stateId, state, (x) => { return { ...x, customersGroups: action.payload.data } })

        case CHANGE_TICKETS_TAGS:
            return updateSetState(action.payload.stateId, state, (x) => { return { ...x, ticketsTags: action.payload.data } })

        case CHANGE_TICKETS_TYPES:
            return updateSetState(action.payload.stateId, state, (x) => { return { ...x, ticketsTypes: action.payload.data } })

        case CHANGE_REPLIES_TYPES:
            return updateSetState(action.payload.stateId, state, (x) => { return { ...x, repliesTypes: action.payload.data } })

        case CHANGE_CONTROLS:
            return updateSetState(action.payload.stateId, state, (x) => {
                return {
                    ...x,
                    controls: action.payload.data,
                    features: []
                }
            })

        case CHANGE_FEATURES:
            return updateSetState(action.payload.stateId, state, (x) => { return { ...x, features: action.payload.data } })

        default:
            return state
    }
}

export function GenerateNewSetTitle(existingSetsTitles: Array<string>): string {
    let setsLength = existingSetsTitles.length
    let isNotUniqueTitle
    do {
        setsLength++
        let setsLengthInner = setsLength
        isNotUniqueTitle = existingSetsTitles.find(x => x === setsLengthInner.toString()) !== undefined
    } while (isNotUniqueTitle)
    return setsLength.toString()
}

function updateSetState<T extends SetState>(title: string, state: Array<T>, replaceState: (currState: T) => T): Array<T> {
    return state.map((x) => { return x.title === title ? replaceState(x) : x })
}
