import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../common/Interfaces'

export const CHANGE_POSITIONS = 'customers_activity/change_positions'
export const changePositions = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_POSITIONS,
        payload: payload
    }
}

export const CHANGE_POSITIONS_INCLUDE = 'customers_activity/change_positions_include'
export const changePositionsInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_POSITIONS_INCLUDE,
        payload: payload
    }
}

export const CHANGE_EMP_TRIBES = 'customers_activity/change_emp_tribes'
export const changeEmpTribes = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_EMP_TRIBES,
        payload: payload
    }
}

export const CHANGE_EMP_TRIBES_INCLUDE = 'customers_activity/change_emp_tribes_include'
export const changeEmpTribesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_EMP_TRIBES_INCLUDE,
        payload: payload
    }
}

export const CHANGE_EMPLOYEES = 'customers_activity/change_employees'
export const changeEmployees = (payload: Payload<string, Array<string>>): PayloadAction<Payload<string, Array<string>>> => {
    return {
        type: CHANGE_EMPLOYEES,
        payload: payload
    }
}

export const CHANGE_EMPLOYEES_INCLUDE = 'customers_activity/change_employees_include'
export const changeEmployeesInclude = (payload: Payload<string, boolean>): PayloadAction<Payload<string, boolean>> => {
    return {
        type: CHANGE_EMPLOYEES_INCLUDE,
        payload: payload
    }
}
