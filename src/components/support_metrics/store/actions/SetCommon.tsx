import { getPayloadAction } from '../../../common/store/Actions'
import {
    getValuesPayloadAction,
    getIncludePayloadAction,
} from '../../../common/store/multiset_container/sets/actions/Actions'


export const CHANGE_PERCENTILE = 'customers_activity/change_percentile'
export const changePercentile = getPayloadAction<number>(CHANGE_PERCENTILE)

export const CHANGE_PERCENTILE_INCLUDE = 'customers_activity/change_percentile_include'
export const changePercentileInclude = getIncludePayloadAction(CHANGE_PERCENTILE_INCLUDE)

export const CHANGE_TRIBES = 'customers_activity/change_tribes'
export const changeTribes = getValuesPayloadAction<string>(CHANGE_TRIBES)

export const CHANGE_TRIBES_INCLUDE = 'customers_activity/change_tribes_include'
export const changeTribesInclude = getIncludePayloadAction(CHANGE_TRIBES_INCLUDE)
