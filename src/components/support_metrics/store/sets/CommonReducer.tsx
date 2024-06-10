import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './Interfaces'
import { updateSetState } from '../../../common/store/multiset_container/Utils'
import {
    CHANGE_PERCENTILE,
    CHANGE_PERCENTILE_INCLUDE,
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

        default:
            return sets
    }
}
