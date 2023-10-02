import { AnyAction } from '@reduxjs/toolkit'
import { SetState } from './SetsReducer'
import {
    updateSetState,
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
            return updateSetState(action.payload.stateId, sets, (x) => {
                return {
                    ...x,
                    empTeams: updateValues(x.empTeams, action.payload.data)
                }
            })
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
