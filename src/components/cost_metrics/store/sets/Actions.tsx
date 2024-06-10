import {
    getValuesPayloadAction,
    getIncludePayloadAction
} from '../../../common/store/multiset_container/sets/actions/Actions'

export const CHANGE_EMP_TEAMS = 'change_emp_teams'
export const CHANGE_EMP_TEAMS_INCLUDE = 'change_emp_teams_include'
export const changeTeams = getValuesPayloadAction<string>(CHANGE_EMP_TEAMS)
export const changeTeamsInclude = getIncludePayloadAction(CHANGE_EMP_TEAMS_INCLUDE)
