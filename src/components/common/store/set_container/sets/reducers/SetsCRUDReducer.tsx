import { AnyAction } from '@reduxjs/toolkit'
import { updateSetState } from '../Utils'
import { BaseSetState } from '../Interfaces'
import { generateSetTitle } from '../Utils'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
} from '../../Actions'

export function getSetsCRUDReducer<Set extends BaseSetState>(default_set: Set, initial_sets: Array<Set>): (sets: Array<Set>, action: AnyAction) => Array<Set> {
    return (sets: Array<Set>, action: AnyAction) => {
        switch (action.type) {

            case ADD_SET:
                const baseSet = sets.find(x => x.title === action.payload) || default_set
                return [...sets, { ...baseSet, title: generateSetTitle(sets.map(x => x.title)) }]

            case REMOVE_SET:
                const restSets = sets.filter(set => set.title !== action.payload)
                return restSets.length ? restSets : initial_sets

            case CHANGE_SET_TITLE:
                return updateSetState(action.payload.stateId, sets, (x) => {
                    return {
                        ...x,
                        title: generateSetTitle(sets.map(x => x.title), action.payload.data),
                    }
                })

            default:
                return sets
        }
    }
}
