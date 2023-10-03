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
        ensureContainer(state)
        ensureSets(state)
        ensureGroupBy(state)
        return {
            container: containerValidator(state),
            sets: setsValidator(state),
        }
    }
}

function ensureContainer(state: MultisetContainerStore) {
    if ('customersActivity' in state) {
        state.container = (state as any).customersActivity
        delete (state as any).customersActivity
    }
}

function ensureSets(state: MultisetContainerStore) {
    if ('customersActivitySets' in state) {
        state.sets = (state as any).customersActivitySets
        delete (state as any).customersActivitySets
    }
}

function ensureGroupBy(state: MultisetContainerStore) {
    const container = state.container
    if ('groupByPeriod' in container) {
        container.groupBy = (container as any).groupByPeriod
        delete (container as any).groupByPeriod
    }
}


export function containerValidator<ContainerState extends BaseContainerState>(container: ContainerState, context: Context, customValidator: (container: ContainerState) => ContainerState): ContainerState {
    const res = defaultContainerValidator(container, context)
    return customValidator(res)
}


function defaultContainerValidator<ContainerState extends BaseContainerState>(container: ContainerState, context: Context): ContainerState {
    return {
        ...container,
        context: context,
        groupBy: groupByOrDefault(container.groupBy),
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
        const res = defaultSetValidator(x)
        return customValidator(res)
    })
}

function defaultSetValidator<SetState extends BaseSetState>(set: SetState): SetState {
    return {
        ...set,
        title: toFriendlyTitle(set.title),
    }
}
