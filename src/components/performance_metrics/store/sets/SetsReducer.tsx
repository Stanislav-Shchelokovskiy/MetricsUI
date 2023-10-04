import { PayloadAction } from '@reduxjs/toolkit'
import { BaseSetState } from '../../../common/store/multiset_container/sets/Interfaces'
import { getSetsReducer } from '../../../common/store/multiset_container/sets/SetsReducerFactory'
import { setsValidator } from '../StoreStateValidator'
import { FilterParameter } from '../../../common/store/multiset_container/sets/Interfaces'
import { getOptionalFilterParameter, getDefaultBaseSet } from '../../../common/store/multiset_container/sets/Defaults'
import { employeesReducer } from './EmployeesReducer'

export interface SetState extends BaseSetState {
    secondShifts: FilterParameter<boolean> | undefined
}

export const DEFAULT_SET: SetState = {
    ...getDefaultBaseSet(),
    secondShifts: getOptionalFilterParameter<boolean>(),
}

export const INITIAL_SETS: Array<SetState> = [DEFAULT_SET]

export function setsReducer(sets: Array<SetState> = INITIAL_SETS, action: PayloadAction<any>): Array<SetState> {
    let res = setsReducerDefault(sets, action)
    return employeesReducer(res, action)
}

const setsReducerDefault = getSetsReducer<SetState>(DEFAULT_SET, INITIAL_SETS, setsValidator)
