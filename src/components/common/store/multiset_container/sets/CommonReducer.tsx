import { AnyAction } from '@reduxjs/toolkit'
import { BaseSetState } from './Interfaces'
import {
    updateSetState,
    updateValues,
    updateValuesInclude
} from '../Utils'

import {
    CHANGE_TRIBES,
    CHANGE_TRIBES_INCLUDE,
    CHANGE_TENTS,
    CHANGE_TENTS_INCLUDE,
} from './actions/Common'


export function commonReducer<SetState extends BaseSetState>(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

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
                    tribes: updateValuesInclude(x.tribes, action.payload.data)
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
                    tents: updateValuesInclude(x.tents, action.payload.data)
                }
            })


        default:
            return sets
    }
}
