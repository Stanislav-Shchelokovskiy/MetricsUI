import { PayloadAction } from '@reduxjs/toolkit'
import { BaseSetState } from '../../common/store/multiset_container/sets/Interfaces'
import { CostMetricsShareableStore } from './Store'
import { getSetsReducer } from '../../common/store/multiset_container/sets/SetsReducerFactory'
import { setsValidator } from './StoreStateValidator'
import { FilterParametersNode } from '../../common/store/multiset_container/sets/Interfaces'
import { getDefaultFilterParametersNode } from '../../common/store/multiset_container/sets/Defaults'
import { employeesReducer } from './sets_reducer/Employees'
import { getDefaultTitle } from '../../common/store/multiset_container/sets/Defaults'

export interface SetState extends BaseSetState {
    empPositions: FilterParametersNode<string> | undefined
    empTribes: FilterParametersNode<string> | undefined
    employees: FilterParametersNode<string> | undefined
}

export const DEFAULT_SET: SetState = {
    title: getDefaultTitle(),
    empPositions: getDefaultFilterParametersNode<string>(),
    empTribes: getDefaultFilterParametersNode<string>(),
    employees: getDefaultFilterParametersNode<string>(),
}

export const INITIAL_SETS: Array<SetState> = [DEFAULT_SET]

export function setsReducer(sets: Array<SetState> = INITIAL_SETS, action: PayloadAction<any>): Array<SetState> {
    let res = setsReducerDefault(sets, action)
    return employeesReducer(res, action)
}

const setsReducerDefault = getSetsReducer<SetState, CostMetricsShareableStore>(DEFAULT_SET, INITIAL_SETS, setsValidator)
