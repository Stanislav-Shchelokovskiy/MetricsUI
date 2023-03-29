import { AnyAction } from '@reduxjs/toolkit'
import { APPLY_STATE } from '../../../common/store/state/Actions'
import { initMissingCustomersActivitySetsProperties } from '../StoreStateMissingPropertiesInitializator'
import { INITIAL_SETS, DEFAULT_SET } from './Defaults'
import { updateSetState } from './Utils'
import { Set } from './Interfaces'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
} from '../actions/Common'

export function generalReducer(sets: Array<Set>, action: AnyAction): Array<Set> {
    switch (action.type) {

        case APPLY_STATE:
            return initMissingCustomersActivitySetsProperties(action.payload.customersActivitySets)


        case ADD_SET:
            const baseSet = sets.find(x => x.title === action.payload) || DEFAULT_SET
            return [...sets, { ...baseSet, title: generateNewSetTitle(sets.map(x => x.title)) }]
        case REMOVE_SET:
            return sets.length < 2 ? INITIAL_SETS : sets.filter(set => set.title !== action.payload)


        case CHANGE_SET_TITLE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    title: action.payload.data,
                }
            })


        default:
            return sets
    }
}

export function generateNewSetTitle(existingSetsTitles: Array<string>): string {
    let setsLength = existingSetsTitles.length
    let isNotUniqueTitle
    do {
        setsLength++
        let setsLengthInner = setsLength
        isNotUniqueTitle = existingSetsTitles.find(x => x === setsLengthInner.toString()) !== undefined
    } while (isNotUniqueTitle)
    return setsLength.toString()
}
