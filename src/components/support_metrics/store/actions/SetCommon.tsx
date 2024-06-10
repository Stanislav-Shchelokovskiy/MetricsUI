import { getPayloadAction } from '../../../common/store/Actions'
import { getIncludePayloadAction } from '../../../common/store/multiset_container/sets/actions/Actions'

export const CHANGE_PERCENTILE = 'customers_activity/change_percentile'
export const changePercentile = getPayloadAction<number>(CHANGE_PERCENTILE)

export const CHANGE_PERCENTILE_INCLUDE = 'customers_activity/change_percentile_include'
export const changePercentileInclude = getIncludePayloadAction(CHANGE_PERCENTILE_INCLUDE)
