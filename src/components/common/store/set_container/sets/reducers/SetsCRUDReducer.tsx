import { AnyAction } from '@reduxjs/toolkit'
import { updateSetState } from '../Utils'
import { BaseSet } from '../Interfaces'
import { generateSetTitle } from '../Utils'
import {
    ADD_SET,
    REMOVE_SET,
    CHANGE_SET_TITLE,
} from '../../Actions'

export function getSetsCRUDReducer<Set extends BaseSet>(default_set: Set, initial_sets: Array<Set>): (sets: Array<Set>, action: AnyAction) => Array<Set> {
    return (sets: Array<Set>, action: AnyAction) => {
        switch (action.type) {

            case ADD_SET:
                const baseSet = sets.find(x => x.title === action.payload) || default_set
                return [...sets, { ...baseSet, title: generateSetTitle(sets.map(x => x.title)) }]

            case REMOVE_SET:
                return sets.length < 2 ? initial_sets : sets.filter(set => set.title !== action.payload)

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
