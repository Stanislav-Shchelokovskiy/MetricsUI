import { getValidGroupByPeriodOrDefault } from '../../components/multiset_container/graph/GroupByPeriodSelector'
import { getValidComparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { getValidMetricOrDefault } from '../../components/multiset_container/graph/MetricSelector'
import { BaseContainerState } from './BaseContainerState'
import { Context } from './Context'

export function defaultContainerValidator<ContainerState extends BaseContainerState>(container: ContainerState, context: Context): ContainerState {
    container.context = context
    container.groupByPeriod = getValidGroupByPeriodOrDefault(container.groupByPeriod)
    container.comparisonMethod = getValidComparisonMethodOrDefault(container.comparisonMethod)
    container.metric = getValidMetricOrDefault(container.metric)
    if (container.hiddenLegends === undefined)
        container.hiddenLegends = []
    return container
}
