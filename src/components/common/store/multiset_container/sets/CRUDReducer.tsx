import { PayloadAction } from '@reduxjs/toolkit'
import { updateSetState } from '../Utils'
import { BaseSetState } from './Interfaces'
import { generateSetTitle } from '../Utils'
import {
    ADD_SET,
    REMOVE_SET,
    DECOMPOSE_SET,
    Decomposition,
    REMOVE_ALL_SETS,
    CHANGE_SET_TITLE,
} from '../Actions'
import { getOptionalFilterParameters } from './Defaults'

export function getSetsCRUDReducer<SetState extends BaseSetState>(
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

            case DECOMPOSE_SET:
                const decomposition = action.payload as Decomposition
                const sourceSet = sets.find(x => x.title === decomposition.sourceSet) || default_set
                const newSets = decomposition.values.map((x) => {
                    const newSet = { ...sourceSet }
                    newSet.title = x[decomposition.displaySelector]
                    newSet[decomposition.propertyName as keyof SetState] = getOptionalFilterParameters([x[decomposition.valueSelector]]) as any
                    return newSet
                })
                return newSets.length ? newSets : initial_sets

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
