import { getDefaultTitle } from './sets/Defaults'
import { groupByOrDefault as groupByOrDefault } from '../../components/multiset_container/graph/GroupBySelector'
import { validComparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { validMetricOrDefault } from '../../components/multiset_container/graph/MetricSelector'
import { getValidRangeOrDefault } from '../../components/RangePeriodSelector'
import { Context } from './Context'

export interface BaseContainerState {
    context: Context
    range: Array<string>
    groupBy: string
    metric: string
    comparisonMethod: string
    sets: Array<string>
    hiddenLegends: Array<string>
}

export function getDefaultBaseContainerState(context: Context): BaseContainerState {
    return {
        context: context,
        range: getValidRangeOrDefault(undefined),
        groupBy: groupByOrDefault(undefined),
        metric: validMetricOrDefault(undefined),
        comparisonMethod: validComparisonMethodOrDefault(undefined),
        sets: [getDefaultTitle()],
        hiddenLegends: Array<string>(),
    }
}
