import {
    getValuesPayloadAction,
    getIncludePayloadAction
} from '../../../common/store/set_container/sets/Actions'


export const CHANGE_POSITIONS = 'customers_activity/change_positions'
export const changePositions = getValuesPayloadAction<string>(CHANGE_POSITIONS)

export const CHANGE_POSITIONS_INCLUDE = 'customers_activity/change_positions_include'
export const changePositionsInclude = getIncludePayloadAction(CHANGE_POSITIONS_INCLUDE)


export const CHANGE_EMP_TRIBES = 'customers_activity/change_emp_tribes'
export const changeEmpTribes = getValuesPayloadAction<string>(CHANGE_EMP_TRIBES)

export const CHANGE_EMP_TRIBES_INCLUDE = 'customers_activity/change_emp_tribes_include'
export const changeEmpTribesInclude = getIncludePayloadAction(CHANGE_EMP_TRIBES_INCLUDE)


export const CHANGE_EMP_TENTS = 'customers_activity/change_emp_tents'
export const changeEmpTents = getValuesPayloadAction<string>(CHANGE_EMP_TENTS)

export const CHANGE_EMP_TENTS_INCLUDE = 'customers_activity/change_emp_tents_include'
export const changeEmpTentsInclude = getIncludePayloadAction(CHANGE_EMP_TENTS_INCLUDE)


export const CHANGE_EMPLOYEES = 'customers_activity/change_employees'
export const changeEmployees = getValuesPayloadAction<string>(CHANGE_EMPLOYEES)

export const CHANGE_EMPLOYEES_INCLUDE = 'customers_activity/change_employees_include'
export const changeEmployeesInclude = getIncludePayloadAction(CHANGE_EMPLOYEES_INCLUDE)
