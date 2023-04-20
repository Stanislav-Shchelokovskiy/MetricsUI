import { AnyAction } from '@reduxjs/toolkit'
import { updateSetState, updateValues, updateInclude } from './Utils'
import { Set } from './Interfaces'
import {
    CHANGE_PERCENTILE,
    CHANGE_PERCENTILE_INCLUDE,
    CHANGE_TRIBES,
    CHANGE_TRIBES_INCLUDE,
    CHANGE_TENTS,
    CHANGE_TENTS_INCLUDE
} from '../actions/SetCommon'


export function commonReducer(sets: Array<Set>, action: AnyAction): Array<Set> {
    switch (action.type) {

        case CHANGE_PERCENTILE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    percentile: {
                        ...x.percentile,
                        value: action.payload.data,
                    }
                }
            })
        case CHANGE_PERCENTILE_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    percentile: {
                        ...x.percentile,
                        include: action.payload.data,
                    }
                }
            })


        case CHANGE_TRIBES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    tribes: updateValues(x.tribes, action.payload.data)
                }
            })
        case CHANGE_TRIBES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    tribes: updateInclude(x.tribes, action.payload.data)
                }
            })


        case CHANGE_TENTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    tents: updateValues(x.tents, action.payload.data)
                }
            })
        case CHANGE_TENTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    tents: updateInclude(x.tents, action.payload.data)
                }
            })


        default:
            return sets
    }
}
