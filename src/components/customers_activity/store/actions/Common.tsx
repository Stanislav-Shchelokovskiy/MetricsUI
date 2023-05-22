import { getAction } from '../../../common/store/Actions'

export const CHANGE_PERIOD = 'customers_activity/change_period'
export const changePeriod = getAction<Array<string>>(CHANGE_PERIOD)

export const CHANGE_GROUP_BY_PERIOD = 'customers_activity/change_group_by_period'
export const changeGroupByPeriod = getAction<string | undefined>(CHANGE_GROUP_BY_PERIOD)

export const CHANGE_METRIC = 'customers_activity/change_metric'
export const changeMetric = getAction<string | undefined>(CHANGE_METRIC)

export const CHANGE_COMPARISON_METHOD = 'customers_activity/change_comparison_method'
export const changeComparisonMethod = getAction<string | undefined>(CHANGE_COMPARISON_METHOD)

export const CHANGE_BASELINE_ALIGNED_MODE = 'customers_activity/change_baseline_aligned_mode'
export const changeBaselineAlignedMode = getAction<boolean>(CHANGE_BASELINE_ALIGNED_MODE)
