import { getAction } from '../../common/store/Actions'
import { Metric } from '../../common/components/multiset_container/graph/MetricSelector'
export const CHANGE_CONTEXT = 'change_context'
export const changeContext = getAction<Metric>(CHANGE_CONTEXT)
