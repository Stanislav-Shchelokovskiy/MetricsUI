import { groupByOrDefault } from '../../components/multiset_container/graph/GroupBySelector'
import { validComparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { validMetricOrDefault } from '../../components/multiset_container/graph/MetricSelector'
import { BaseContainerState } from './BaseContainerState'
import { Context } from './Context'

interface OldContainerState extends BaseContainerState {
    groupByPeriod?: string
    [key: string]: any
}

export function defaultContainerValidator<ContainerState extends BaseContainerState>(container: ContainerState, context: Context): ContainerState {
    container.context = context
    container.groupBy = validateGroupBy(container)
    container.comparisonMethod = validComparisonMethodOrDefault(container.comparisonMethod)
    container.metric = validMetricOrDefault(container.metric)
    if (container.hiddenLegends === undefined)
        container.hiddenLegends = []
    return container
}

function validateGroupBy(container: OldContainerState): string {
    const groupBy = 'groupBy' in container ? container.groupBy : (container as OldContainerState).groupByPeriod
    delete  (container as OldContainerState)['groupByPeriod']
    return groupByOrDefault(groupBy)
}
