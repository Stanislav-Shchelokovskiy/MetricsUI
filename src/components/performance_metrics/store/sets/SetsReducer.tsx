import { PayloadAction } from '@reduxjs/toolkit'
import { BaseSetState } from '../../../common/store/multiset_container/sets/Interfaces'
import { PerformanceMetricsShareableStore } from '../Store'
import { getSetsReducer } from '../../../common/store/multiset_container/sets/SetsReducerFactory'
import { setsValidator } from '../StoreStateValidator'
import { FilterParametersNode, FilterParameterNode } from '../../../common/store/multiset_container/sets/Interfaces'
import { getDefaultFilterParametersNode, getOptionalDefaultFilterParameterNode } from '../../../common/store/multiset_container/sets/Defaults'
import { employeesReducer } from './EmployeesReducer'
import { getDefaultTitle } from '../../../common/store/multiset_container/sets/Defaults'

export interface SetState extends BaseSetState {
    tents: FilterParametersNode<string> | undefined
    empTents: FilterParametersNode<string> | undefined
    positions: FilterParametersNode<string> | undefined
    levels: FilterParametersNode<number> | undefined
    employees: FilterParametersNode<string> | undefined
    secondShifts: FilterParameterNode<boolean> | undefined
}

export const DEFAULT_SET: SetState = {
    title: getDefaultTitle(),
    tents: getDefaultFilterParametersNode<string>(),
    empTents: getDefaultFilterParametersNode<string>(),
    positions: getDefaultFilterParametersNode<string>(),
    levels: getDefaultFilterParametersNode<number>(),
    employees: getDefaultFilterParametersNode<string>(),
    secondShifts: getOptionalDefaultFilterParameterNode<boolean>(),
}

export const INITIAL_SETS: Array<SetState> = [DEFAULT_SET]

export function setsReducer(sets: Array<SetState> = INITIAL_SETS, action: PayloadAction<any>): Array<SetState> {
    let res = setsReducerDefault(sets, action)
    return employeesReducer(res, action)
}

const setsReducerDefault = getSetsReducer<SetState, PerformanceMetricsShareableStore>(DEFAULT_SET, INITIAL_SETS, setsValidator)
