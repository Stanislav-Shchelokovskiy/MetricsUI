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
    CHANGE_EMP_TENTS,
    CHANGE_EMP_TENTS_INCLUDE,
    CHANGE_EMPLOYEES,
    CHANGE_EMPLOYEES_INCLUDE,
} from '../../../common/store/multiset_container/sets/actions/Employees'

import {
    CHANGE_TRAINEE,
    CHANGE_TRAINEE_INCLUDE,
    CHANGE_JUNIOR,
    CHANGE_JUNIOR_INCLUDE,
    CHANGE_SECOND_SHIFTS,
    CHANGE_SECOND_SHIFTS_INCLUDE,
} from './Actions'


export function employeesReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

        case CHANGE_TENTS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTeams: updateValues(x.tents, action.payload.data)
                }
            })
        case CHANGE_TENTS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTeams: updateValuesInclude(x.tents, action.payload.data)
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
                    empPositions: updateValues(x.positions, action.payload.data)
                }
            })
        case CHANGE_EMP_POSITIONS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empPositions: updateValuesInclude(x.positions, action.payload.data)
                }
            })

        case CHANGE_TRAINEE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    trainee: updateThreeStateValue(x.trainee, action.payload.data)
                }
            })
        case CHANGE_TRAINEE_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    trainee: updateThreeStateValueInclude(x.trainee, action.payload.data, true)
                }
            })

        case CHANGE_JUNIOR:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    junior: updateThreeStateValue(x.junior, action.payload.data)
                }
            })
        case CHANGE_JUNIOR_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    junior: updateThreeStateValueInclude(x.junior, action.payload.data, true)
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
