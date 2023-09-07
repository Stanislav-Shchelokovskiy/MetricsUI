import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './SetsReducer'
import {
    updateSetState,
    updateValues,
    updateValuesInclude,
    updateThreeStateValue,
    updateThreeStateValueInclude,
} from '../../../common/store/multiset_container/Utils'
import {
    CHANGE_TENTS,
    CHANGE_TENTS_INCLUDE
} from '../../../common/store/multiset_container/sets/actions/Common'
import {
    CHANGE_EMP_POSITIONS,
    CHANGE_EMP_POSITIONS_INCLUDE,
    CHANGE_LEVELS,
    CHANGE_LEVELS_INCLUDE,
    CHANGE_EMP_TENTS,
    CHANGE_EMP_TENTS_INCLUDE,
    CHANGE_EMPLOYEES,
    CHANGE_EMPLOYEES_INCLUDE,
} from '../../../common/store/multiset_container/sets/actions/Employees'

import {
    CHANGE_SECOND_SHIFTS,
    CHANGE_SECOND_SHIFTS_INCLUDE,
} from './Actions'


export function employeesReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

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

        case CHANGE_EMP_TENTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTents: updateValues(x.empTents, action.payload.data)
                }
            })
        case CHANGE_EMP_TENTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTents: updateValuesInclude(x.empTents, action.payload.data)
                }
            })

        case CHANGE_EMP_POSITIONS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    positions: updateValues(x.positions, action.payload.data)
                }
            })
        case CHANGE_EMP_POSITIONS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    positions: updateValuesInclude(x.positions, action.payload.data)
                }
            })

        case CHANGE_LEVELS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    levels: updateValues(x.levels, action.payload.data)
                }
            })
        case CHANGE_LEVELS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    levels: updateValuesInclude(x.levels, action.payload.data)
                }
            })

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

        case CHANGE_EMPLOYEES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    employees: updateValues(x.employees, action.payload.data)
                }
            })
        case CHANGE_EMPLOYEES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    employees: updateValuesInclude(x.employees, action.payload.data)
                }
            })

        default:
            return sets
    }
}
