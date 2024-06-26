import { groupByOrDefault } from '../../components/multiset_container/graph/GroupBySelector'
import { comparisonMethodOrDefault } from '../../components/multiset_container/graph/ComparisonMethodSelector'
import { metricOrDefault } from '../../components/multiset_container/graph/metric_selector/MetricSelector'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'
import { Context } from './Context'
import { toFriendlyTitle } from './Utils'
import { MultisetContainerStore, StateValidator } from './Store'
import { booleanSetting } from '../../Typing'
import { dateToISOstr, periodOrDefault } from '../../DatePeriodUtils'


export function stateValidator<ContainerState extends BaseContainerState, SetState extends BaseSetState>(
    containerValidator: (container: ContainerState) => ContainerState,
    setsValidator: (sets: Array<SetState>) => Array<SetState>
): StateValidator<ContainerState, SetState> {
    return (newState: MultisetContainerStore<ContainerState, SetState>, currentState?: MultisetContainerStore<ContainerState, SetState>) => {
        preValidateState(newState)
        const nonValidatedState = currentState || newState
        return {
            ...nonValidatedState,
            container: containerValidator(newState.container),
            sets: setsValidator(newState.sets),
        }
    }
}

export function preValidateState(state: MultisetContainerStore) {
    ensureContainer(state)
    ensureSets(state)
    ensureGroupBy(state)
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


export function containerValidator<ContainerState extends BaseContainerState>(
    container: ContainerState,
    context: Context,
    customValidator: (container: ContainerState) => ContainerState = (container) => container
): ContainerState {
    const res = defaultContainerValidator(container, context)
    return customValidator(res)
}


function defaultContainerValidator<ContainerState extends BaseContainerState>(container: ContainerState, context: Context): ContainerState {
    return {
        ...container,
        context: context,
        groupBy: groupByOrDefault(container.groupBy, context),
        comparisonMethod: comparisonMethodOrDefault(container.comparisonMethod),
        metric: metricOrDefault(container.metric),
        hiddenLegends: hiddenLegendsOrDefault(container.hiddenLegends),
        sets: container.sets.map(x => toFriendlyTitle(x)),
        range: periodOrDefault(extendedRange(container)),
    }
}

function extendedRange<ContainerState extends BaseContainerState>(container: ContainerState) {
    let range = container.range
    if (!booleanSetting(container.disablePeriodExtension) && range?.length)
        return [range[0], dateToISOstr(new Date())]
    return range
}

function hiddenLegendsOrDefault(hiddenLegends: Array<any> | undefined) {
    return hiddenLegends ? hiddenLegends : []
}


export function setsValidator<SetState extends BaseSetState>(
    sets: Array<SetState>,
    customValidator: (set: SetState) => SetState = (set) => set,
): Array<SetState> {
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
