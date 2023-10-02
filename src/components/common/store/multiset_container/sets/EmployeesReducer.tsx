import { AnyAction } from '@reduxjs/toolkit'
import { BaseSetState } from './Interfaces'
import {
    updateSetState,
    updateValues,
    updateValuesInclude
} from '../Utils'
import {
    CHANGE_EMP_TRIBES,
    CHANGE_EMP_TRIBES_INCLUDE,
    CHANGE_EMP_TENTS,
    CHANGE_EMP_TENTS_INCLUDE,
    CHANGE_POSITIONS,
    CHANGE_POSITIONS_INCLUDE,
    CHANGE_LEVELS,
    CHANGE_LEVELS_INCLUDE,
    CHANGE_EMPLOYEES,
    CHANGE_EMPLOYEES_INCLUDE,
} from './actions/Employees'


export function employeesReducer<SetState extends BaseSetState>(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

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
                    empTribes: updateValuesInclude(x.empTribes, action.payload.data)
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


        case CHANGE_POSITIONS:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    positions: updateValues(x.positions, action.payload.data)
                }
            })
        case CHANGE_POSITIONS_INCLUDE:
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
