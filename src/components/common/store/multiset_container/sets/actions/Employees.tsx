import {
    getValuesPayloadAction,
    getIncludePayloadAction
} from './Actions'
import { SupportsNullFilter } from '../../../../Typing'


export const CHANGE_EMP_TRIBES = 'change_emp_tribes'
export const CHANGE_EMP_TRIBES_INCLUDE = 'change_emp_tribes_include'
export const changeEmpTribes = getValuesPayloadAction<string>(CHANGE_EMP_TRIBES)
export const changeEmpTribesInclude = getIncludePayloadAction(CHANGE_EMP_TRIBES_INCLUDE)


export const CHANGE_EMP_TENTS = 'change_emp_tents'
export const CHANGE_EMP_TENTS_INCLUDE = 'change_emp_tents_include'
export const changeEmpTents = getValuesPayloadAction<string>(CHANGE_EMP_TENTS)
export const changeEmpTentsInclude = getIncludePayloadAction(CHANGE_EMP_TENTS_INCLUDE)


export const CHANGE_POSITIONS = 'change_positions'
export const CHANGE_POSITIONS_INCLUDE = 'change_positions_include'
export const changePositions = getValuesPayloadAction<string>(CHANGE_POSITIONS)
export const changePositionsInclude = getIncludePayloadAction(CHANGE_POSITIONS_INCLUDE)


export const CHANGE_LEVELS = 'change_levels'
export const CHANGE_LEVELS_INCLUDE = 'change_level_include'
export const changeLevels = getValuesPayloadAction<SupportsNullFilter<number>>(CHANGE_LEVELS)
export const changeLevelsInclude = getIncludePayloadAction(CHANGE_LEVELS_INCLUDE)

export const CHANGE_ROLES = 'change_roles'
export const CHANGE_ROLES_INCLUDE = 'change_roles_include'
export const changeRoles = getValuesPayloadAction<string>(CHANGE_ROLES)
export const changeRolesInclude = getIncludePayloadAction(CHANGE_ROLES_INCLUDE)

export const CHANGE_EMPLOYEES = 'change_employees'
export const CHANGE_EMPLOYEES_INCLUDE = 'change_employees_include'
export const changeEmployees = getValuesPayloadAction<string>(CHANGE_EMPLOYEES)
export const changeEmployeesInclude = getIncludePayloadAction(CHANGE_EMPLOYEES_INCLUDE)
