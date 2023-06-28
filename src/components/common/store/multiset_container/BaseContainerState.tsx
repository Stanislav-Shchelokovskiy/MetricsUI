import { getDefaultTitle } from './sets/Defaults'
import { getValidGroupByPeriodOrDefault } from '../../components/multiset_container/graph/GroupByPeriodSelector'
import { getValidComparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../../components/multiset_container/graph/MetricSelector'
import { getValidRangeOrDefault } from '../../components/RangePeriodSelector'
import { Context } from './Context'

export interface BaseContainerState {
    context: Context
    range: Array<string>
    groupByPeriod: string
    metric: string
    comparisonMethod: string
    sets: Array<string>
    hiddenLegends: Array<string>
}

export function getDefaultBaseContainerState(context: Context): BaseContainerState {
    return {
        context: context,
        range: getValidRangeOrDefault(undefined),
        groupByPeriod: getValidGroupByPeriodOrDefault(undefined),
        metric: getValidMetricOrDefault(undefined),
        comparisonMethod: getValidComparisonMethodOrDefault(undefined),
        sets: [getDefaultTitle()],
        hiddenLegends: Array<string>(),
    }
}
