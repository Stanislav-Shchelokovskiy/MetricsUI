import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './Interfaces'
import { DEFAULT_SET } from './Defaults'
import {
    updateSetState,
    updateSetStateEnsureVal,
    updateValues,
    updateValuesInclude,
} from '../../../common/store/multiset_container/Utils'

import {
    CHANGE_EMP_TEAMS,
    CHANGE_EMP_TEAMS_INCLUDE
} from './Actions'

export function employeesReducer(sets: Array<SetState>, action: AnyAction): Array<SetState> {
    switch (action.type) {

        case CHANGE_EMP_TEAMS:
            return updateSetStateEnsureVal(
                action.payload.stateId,
                sets,
                (set) => set?.empTeams?.values,
                action.payload.data,
                DEFAULT_SET.empTeams?.values,
                (set, newVal) => {
                    return {
                        ...set,
                        empTeams: updateValues(set.empTeams, newVal)
                    }
                }
            )
        case CHANGE_EMP_TEAMS_INCLUDE:
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTeams: updateValuesInclude(x.empTeams, action.payload.data)
                }
            })

        default:
            return sets
    }
}
