import { AnyAction } from '@reduxjs/toolkit'
import { Tribe } from '../../common/Interfaces'
import { CustomersGroup } from '../network_resource_fetcher/FetchCustomersGroups'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_SELECTED_TRIBES,
    CHANGE_SELECTED_CUSTOMERS_GROUPS,
} from './Actions'


export interface SetState {
    title: string
    selectedCustomersGroups: Array<CustomersGroup>
    selectedTribes: Array<Tribe>
}

export const INITIAL_SET_STATE: SetState = {
    title: '0',
    selectedCustomersGroups: Array<CustomersGroup>(),
    selectedTribes: Array<Tribe>()
}

const INTIAL_SETS_STATE: Array<SetState> = [INITIAL_SET_STATE]


export const SetsReducer = (state: Array<SetState> = INTIAL_SETS_STATE, action: AnyAction): Array<SetState> => {
    switch (action.type) {

        case ADD_SET:
            const baseSet = state.find(x => x.title === action.payload) || INITIAL_SET_STATE
            return [...state, { ...baseSet, title: GenerateNewSetTitle(state.map(x => x.title)) }]

        case REMOVE_SET:
            return state.filter(set => set.title !== action.payload)

        case CHANGE_SELECTED_TRIBES:
            return updateSetState(action.payload.title, state, (x) => { return { ...x, selectedTribes: action.payload.data } })

        case CHANGE_SELECTED_CUSTOMERS_GROUPS:
            return updateSetState(action.payload.title, state, (x) => { return { ...x, selectedCustomersGroups: action.payload.data } })

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
