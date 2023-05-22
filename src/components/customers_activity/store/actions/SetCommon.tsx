import {
    getValuesPayloadAction,
    getIncludePayloadAction,
} from '../../../common/store/set_container/sets/Actions'
import { getPayloadAction } from '../../../common/store/Actions'


export const CHANGE_PERCENTILE = 'customers_activity/change_percentile'
export const changePercentile = getPayloadAction<number>(CHANGE_PERCENTILE)

export const CHANGE_PERCENTILE_INCLUDE = 'customers_activity/change_percentile_include'
export const changePercentileInclude = getIncludePayloadAction(CHANGE_PERCENTILE_INCLUDE)

export const CHANGE_TRIBES = 'customers_activity/change_tribes'
export const changeTribes = getValuesPayloadAction<string>(CHANGE_TRIBES)

export const CHANGE_TRIBES_INCLUDE = 'customers_activity/change_tribes_include'
export const changeTribesInclude = getIncludePayloadAction(CHANGE_TRIBES_INCLUDE)

export const CHANGE_TENTS = 'customers_activity/change_tents'
export const changeTents = getValuesPayloadAction<string>(CHANGE_TENTS)

export const CHANGE_TENTS_INCLUDE = 'customers_activity/change_tents_include'
export const changeTentsInclude = getIncludePayloadAction(CHANGE_TENTS_INCLUDE)
