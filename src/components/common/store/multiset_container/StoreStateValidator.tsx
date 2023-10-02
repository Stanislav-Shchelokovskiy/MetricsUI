import { groupByOrDefault } from '../../components/multiset_container/graph/GroupBySelector'
import { validComparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { validMetricOrDefault } from '../../components/multiset_container/graph/MetricSelector'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'
import { Context } from './Context'
import { toFriendlyTitle } from './Utils'
import { MultisetContainerStore } from './Store'


export function stateValidator<ContainerState extends BaseContainerState, SetState extends BaseSetState>(
    containerValidator: (state: MultisetContainerStore<ContainerState, SetState>) => ContainerState,
    setsValidator: (state: MultisetContainerStore<ContainerState, SetState>) => Array<SetState>
): (state: MultisetContainerStore<ContainerState, SetState>) => MultisetContainerStore<ContainerState, SetState> {
    return (state: MultisetContainerStore<ContainerState, SetState>) => {
        return {
            container: containerValidator(state),
            sets: setsValidator(state),
        }
    }
}


interface OldContainerState extends BaseContainerState {
    groupByPeriod?: string
    [key: string]: any
}

export function containerValidator<ContainerState extends BaseContainerState>(container: ContainerState, context: Context, customValidator: (container: ContainerState) => ContainerState): ContainerState {
    const res = defaultContainerValidator(container, context)
    return customValidator(res)
}

function defaultContainerValidator<ContainerState extends BaseContainerState>(container: ContainerState, context: Context): ContainerState {
    return {
        ...container,
        context: context,
        groupBy: groupByOrDefault_(container),
        comparisonMethod: validComparisonMethodOrDefault(container.comparisonMethod),
        metric: validMetricOrDefault(container.metric),
        hiddenLegends: hiddenLegendsOrDefault(container.hiddenLegends),
        sets: container.sets.map(x => toFriendlyTitle(x)),
    }
}

function hiddenLegendsOrDefault(hiddenLegends: Array<any> | undefined) {
    return hiddenLegends ? hiddenLegends : []
}

export function setsValidator<SetState extends BaseSetState>(sets: Array<SetState>, customValidator: (set: SetState) => SetState): Array<SetState> {
    return sets.map(x => {
        const res = defaultSetsValidator(x)
        return customValidator(res)
    })
}

function defaultSetsValidator<SetState extends BaseSetState>(set: SetState): SetState {
    return {
        ...set,
        title: toFriendlyTitle(set.title),
    }
}

function groupByOrDefault_(container: OldContainerState): string {
    const groupBy = 'groupBy' in container ? container.groupBy : (container as OldContainerState).groupByPeriod
    delete (container as OldContainerState).groupByPeriod
    return groupByOrDefault(groupBy)
}
