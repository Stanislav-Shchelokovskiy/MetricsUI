import { PayloadAction } from '@reduxjs/toolkit'
import { SetState } from './Interfaces'
import { INITIAL_SETS, DEFAULT_SET } from './Defaults'
import { getSetsReducer } from '../../../common/store/multiset_container/sets/SetsReducerFactory'
import { setsValidator } from '../StoreStateValidator'
import { employeesReducer } from './EmployeesReducer'


export function setsReducer(sets: Array<SetState> = INITIAL_SETS, action: PayloadAction<any>): Array<SetState> {
    let res = setsReducerDefault(sets, action)
    return employeesReducer(res, action)
}

const setsReducerDefault = getSetsReducer<SetState>(DEFAULT_SET, INITIAL_SETS, setsValidator)
