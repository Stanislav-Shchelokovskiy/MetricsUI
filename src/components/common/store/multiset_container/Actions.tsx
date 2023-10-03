import { getAction } from '../Actions'
import { getPayloadAction } from '../Actions'

export const ADD_SET = 'add_set'
export const addSet = getAction<string>(ADD_SET)

export const REMOVE_SET = 'remove_set'
export const removeSet = getAction<string>(REMOVE_SET)

export const REMOVE_ALL_SETS = 'remove_all_sets'
export const removeAllSets = getAction<undefined>(REMOVE_ALL_SETS)

export const CHANGE_SET_TITLE = 'change_set_title'
export const changeSetTitle = getPayloadAction<string>(CHANGE_SET_TITLE)

export const HIDE_LEGENDS = 'hide_legends'
export const hideLegends = getAction<Array<string>>(HIDE_LEGENDS)

export const CHANGE_PERIOD = 'change_period'
export const changePeriod = getAction<Array<string>>(CHANGE_PERIOD)

export const CHANGE_GROUP_BY = 'change_group_by'
export const changeGroupBy = getAction<string | undefined>(CHANGE_GROUP_BY)

export const CHANGE_METRIC = 'change_metric'
export const changeMetric = getAction<string | undefined>(CHANGE_METRIC)

export const CHANGE_COMPARISON_METHOD = 'change_comparison_method'
export const changeComparisonMethod = getAction<string | undefined>(CHANGE_COMPARISON_METHOD)

export const VALIDATE_STATE = 'validate_state'
export const validateState = getAction<undefined>(VALIDATE_STATE)
