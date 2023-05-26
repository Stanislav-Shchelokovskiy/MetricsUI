import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './Interfaces'
import { 
    updateSetState,
    updateValues,
    updateInclude
} from '../../../common/store/multiset_container/sets/Utils'
import {
    CHANGE_PERCENTILE,
    CHANGE_PERCENTILE_INCLUDE,
    CHANGE_TRIBES,
    CHANGE_TRIBES_INCLUDE,
    CHANGE_TENTS,
    CHANGE_TENTS_INCLUDE
} from '../actions/SetCommon'


export function commonReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
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
