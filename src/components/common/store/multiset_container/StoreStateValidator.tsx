import { groupByOrDefault } from '../../components/multiset_container/graph/GroupBySelector'
import { validComparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { validMetricOrDefault } from '../../components/multiset_container/graph/MetricSelector'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'
import { Context } from './Context'
import { toFriendlyTitle } from './Utils'

interface OldContainerState extends BaseContainerState {
    groupByPeriod?: string
    [key: string]: any
}

export function defaultContainerValidator<ContainerState extends BaseContainerState>(container: ContainerState, context: Context): ContainerState {
    return {
        ...container,
        context: context,
        groupBy: groupByOrDefault_(container),
        comparisonMethod: validComparisonMethodOrDefault(container.comparisonMethod),
        metric: validMetricOrDefault(container.metric),
        hiddenLegends: hiddenLegendsOrDefault(container.hiddenLegends),
    }
}

function hiddenLegendsOrDefault(hiddenLegends: Array<any> | undefined) {
    return hiddenLegends ? hiddenLegends : []
}

export function defaultSetsValidator<SetState extends BaseSetState>(sets: Array<SetState>): Array<SetState> {
    return sets.map(x => {
        return {
            ...x,
            title: toFriendlyTitle(x.title)
        }
    })
}

function groupByOrDefault_(container: OldContainerState): string {
    const groupBy = 'groupBy' in container ? container.groupBy : (container as OldContainerState).groupByPeriod
    delete (container as OldContainerState)['groupByPeriod']
    return groupByOrDefault(groupBy)
}
