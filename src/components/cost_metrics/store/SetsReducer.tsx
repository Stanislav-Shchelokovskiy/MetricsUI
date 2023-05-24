import { AnyAction } from '@reduxjs/toolkit'
import { BaseSet } from '../../common/store/set_container/sets/Interfaces'
import { CostMetricsShareableState } from './Store'
import { getViewStateReducer } from '../../common/store/set_container/ViewStateReducer'
import { getSetsCRUDReducer } from '../../common/store/set_container/sets/reducers/SetsCRUDReducer'
import { setsValidator } from './StoreStateValidator'
import { FilterParametersNode } from '../../common/store/set_container/sets/Interfaces'
import { getDefaultFilterParametersNode } from '../../common/store/set_container/sets/Defaults'
import { employeesReducer } from './sets_reducer/Employees'

export interface Set extends BaseSet {
    empPositions: FilterParametersNode<string> | undefined
    empTribes: FilterParametersNode<string> | undefined
    employees: FilterParametersNode<string> | undefined
}

export const DEFAULT_SET: Set = {
    title: '0',
    empPositions: getDefaultFilterParametersNode<string>(),
    empTribes: getDefaultFilterParametersNode<string>(),
    employees: getDefaultFilterParametersNode<string>(),
}

export const INITIAL_SETS: Array<Set> = [DEFAULT_SET]

export function SetsReducer(sets: Array<Set> = INITIAL_SETS, action: AnyAction): Array<Set> {
    let res = setsCRUDReducer(sets, action)
    res = employeesReducer(res, action)
    return stateReducer(res, action)
}

const setsCRUDReducer = getSetsCRUDReducer<Set>(DEFAULT_SET, INITIAL_SETS)
const stateReducer = getViewStateReducer<Array<Set>, CostMetricsShareableState>(setsValidator)
