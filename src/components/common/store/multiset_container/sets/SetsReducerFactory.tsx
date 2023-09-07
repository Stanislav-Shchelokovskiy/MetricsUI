import { PayloadAction } from '@reduxjs/toolkit'
import { updateSetState } from '../Utils'
import { BaseSetState } from './Interfaces'
import { generateSetTitle } from '../Utils'
import { getViewStateReducer } from '../ViewStateReducer'
import {
    ADD_SET,
    REMOVE_SET,
    REMOVE_ALL_SETS,
    CHANGE_SET_TITLE,
} from '../Actions'

export function getSetsReducer<SetState extends BaseSetState, ShareableStateT>(
    default_set: SetState,
    initial_sets: Array<SetState>,
    stateValidator: (state: ShareableStateT) => Array<SetState>)
    : (sets: Array<SetState>, action: PayloadAction<any>) => Array<SetState> {

    const setsCRUDReducer = getSetsCRUDReducer<SetState>(default_set, initial_sets)
    const viewStateReducer = getViewStateReducer<Array<SetState>, ShareableStateT>(stateValidator)

    return (sets: Array<SetState> = initial_sets, action: PayloadAction<any>): Array<SetState> => {
        let res = setsCRUDReducer(sets, action)
        return viewStateReducer(res, action)
    }
}

function getSetsCRUDReducer<SetState extends BaseSetState>(
    default_set: SetState,
    initial_sets: Array<SetState>
): (sets: Array<SetState>, action: PayloadAction<any>) => Array<SetState> {

    return (sets: Array<SetState>, action: PayloadAction<any>) => {
        switch (action.type) {

            case ADD_SET:
                const baseSet = sets.find(x => x.title === action.payload) || default_set
                return [...sets, { ...baseSet, title: generateSetTitle(sets.map(x => x.title), action.payload) }]

            case REMOVE_SET:
                const restSets = sets.filter(set => set.title !== action.payload)
                return restSets.length ? restSets : initial_sets

            case REMOVE_ALL_SETS:
                return initial_sets

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
