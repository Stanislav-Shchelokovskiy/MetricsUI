import { getAction } from '../../common/store/Actions'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'
import { Context } from '../../common/store/multiset_container/Context'

export const CHANGE_METRIC = 'change_metric'
export const changeMetric = getAction<Metric>(CHANGE_METRIC)

export const CHANGE_CONTEXT = 'change_context'
export const changeContext = getAction<Context>(CHANGE_CONTEXT)

export const RESET_CONTEXT = 'reset_context'
export const resetContext = getAction<undefined>(RESET_CONTEXT)
