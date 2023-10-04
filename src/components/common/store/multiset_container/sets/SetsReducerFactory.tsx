import { PayloadAction } from '@reduxjs/toolkit'
import { BaseSetState } from './Interfaces'
import { getViewStateReducer } from '../ViewStateReducer'
import { getSetsCRUDReducer } from './CRUDReducer'
import { employeesReducer } from './EmployeesReducer'
import { commonReducer } from './CommonReducer'

export function getSetsReducer<SetState extends BaseSetState>(
    default_set: SetState,
    initial_sets: Array<SetState>,
    setsValidator: (sets: Array<SetState>) => Array<SetState>,
): (sets: Array<SetState>, action: PayloadAction<any>) => Array<SetState> {

    const setsCRUDReducer = getSetsCRUDReducer<SetState>(default_set, initial_sets)
    const viewStateReducer = getViewStateReducer<Array<SetState>>(setsValidator, state => state.sets as Array<SetState>)

    return (sets: Array<SetState> = initial_sets, action: PayloadAction<any>): Array<SetState> => {
        let res = setsCRUDReducer(sets, action)
        res = viewStateReducer(res, action)
        res = commonReducer(res, action)
        return employeesReducer(res, action)
    }
}
