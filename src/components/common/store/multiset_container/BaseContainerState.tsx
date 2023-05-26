import { getDefaultTitle } from './sets/Defaults'
import { getValidGroupByPeriodOrDefault } from '../../components/multiset_container/graph/GroupByPeriodSelector'
import { getValidComparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../../components/multiset_container/graph/MetricSelector'

export interface BaseContainerState {
    range: Array<string>
    groupByPeriod: string
    metric: string
    comparisonMethod: string
    sets: Array<string>
    hiddenLegends: Array<string>
}

export function getDefaultBaseContainerState(): BaseContainerState {
    return {
        range: Array<string>(),
        groupByPeriod: getValidGroupByPeriodOrDefault(undefined),
        metric: getValidMetricOrDefault(undefined),
        comparisonMethod: getValidComparisonMethodOrDefault(undefined),
        sets: [getDefaultTitle()],
        hiddenLegends: Array<string>(),
    }
}
