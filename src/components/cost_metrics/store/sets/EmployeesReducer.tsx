import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './SetsReducer'
import {
    updateSetState,
    updateValues,
    updateInclude
} from '../../../common/store/multiset_container/Utils'
import {
    CHANGE_EMP_POSITIONS,
    CHANGE_EMP_POSITIONS_INCLUDE,
    CHANGE_EMP_TRIBES,
    CHANGE_EMP_TRIBES_INCLUDE,
    CHANGE_EMPLOYEES,
    CHANGE_EMPLOYEES_INCLUDE,
} from '../../../common/store/multiset_container/sets/actions/Employees'

import {
    CHANGE_EMP_TEAMS,
    CHANGE_EMP_TEAMS_INCLUDE
} from './Actions'


export function employeesReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

        case CHANGE_EMP_TEAMS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTeams: updateValues(x.empTeams, action.payload.data)
                }
            })
        case CHANGE_EMP_TEAMS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTeams: updateInclude(x.empTeams, action.payload.data)
                }
            })

        case CHANGE_EMP_TRIBES:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTribes: updateValues(x.empTribes, action.payload.data)
                }
            })
        case CHANGE_EMP_TRIBES_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTribes: updateInclude(x.empTribes, action.payload.data)
                }
            })

        case CHANGE_EMP_POSITIONS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empPositions: updateValues(x.empPositions, action.payload.data)
                }
            })
        case CHANGE_EMP_POSITIONS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empPositions: updateInclude(x.empPositions, action.payload.data)
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
                    employees: updateInclude(x.employees, action.payload.data)
                }
            })


        default:
            return sets
    }
}
