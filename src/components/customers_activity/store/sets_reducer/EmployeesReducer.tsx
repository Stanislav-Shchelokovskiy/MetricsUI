import { AnyAction } from '@reduxjs/toolkit'
import { updateSetState, updateValues, updateInclude } from './Utils'
import { Set } from './Interfaces'
import {
    CHANGE_POSITIONS,
    CHANGE_POSITIONS_INCLUDE,
    CHANGE_EMP_TENTS,
    CHANGE_EMP_TENTS_INCLUDE,
    CHANGE_EMP_TRIBES,
    CHANGE_EMP_TRIBES_INCLUDE,
    CHANGE_EMPLOYEES,
    CHANGE_EMPLOYEES_INCLUDE,
} from '../actions/Employees'


export function employeesReducer(sets: Array<Set>, action: AnyAction): Array<Set> {
    switch (action.type) {

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
                    positions: updateInclude(x.positions, action.payload.data)
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
                    empTents: updateInclude(x.empTents, action.payload.data)
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
