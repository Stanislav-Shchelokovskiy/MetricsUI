import { getSelector } from '../../Selectors'
import { nameOf } from '../Interfaces'

export const empTribesSelectorName = nameOf('empTribes')
export const empTentsSelectorName = nameOf('empTents')
export const positionsSelectorName = nameOf('positions')
export const levelsSelectorName = nameOf('levels')
export const rolesSelectorName = nameOf('roles')
export const employeesSelectorName = nameOf('employees')


export const empTribesSelector = getSelector(set => set?.empTribes)
export const empTentsSelector = getSelector(set => set?.empTents)
export const positionsSelector = getSelector(set => set?.positions)
export const levelsSelector = getSelector(set => set?.levels)
export const rolesSelector = getSelector(set => set?.roles)
export const employeesSelector = getSelector(set => set?.employees)
