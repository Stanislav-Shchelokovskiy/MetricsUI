import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './SetsReducer'
import {
    updateSetState,
    updateThreeStateValue,
    updateThreeStateValueInclude,
} from '../../../common/store/multiset_container/Utils'

import {
    CHANGE_SECOND_SHIFTS,
    CHANGE_SECOND_SHIFTS_INCLUDE,
} from './Actions'


export function employeesReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

        case CHANGE_SECOND_SHIFTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    secondShifts: updateThreeStateValue(x.secondShifts, action.payload.data)
                }
            })
        case CHANGE_SECOND_SHIFTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    secondShifts: updateThreeStateValueInclude(x.secondShifts, action.payload.data, true)
                }
            })

        default:
            return sets
    }
}
