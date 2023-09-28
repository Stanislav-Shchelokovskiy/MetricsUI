import { SupportMetricsShareableStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './SetsReducer'
import { DEFAULT_SET } from './sets/Defaults'
import { defaultContainerValidator, defaultSetsValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { toFriendlyTitle } from '../../common/store/multiset_container/Utils'
import { SupportMetricsStore } from './Store'


export function storeValidator({ customersActivity, customersActivitySets, ...remainder }: any): SupportMetricsStore {
    const state = customersActivity ? {
        container: customersActivity,
        sets: customersActivitySets,
        ...remainder,
    } : remainder
    return {
        container: containerValidator(state),
        sets: setsValidator(state),
    }
}

export function containerValidator(state: SupportMetricsShareableStore): ContainerState {
    ensureContainer(state)
    const container = defaultContainerValidator(state.container, CONTEXT)
    container.sets = container.sets.map(x => toFriendlyTitle(x))
    if (container.baselineAlignedModeEnabled === undefined)
        container.baselineAlignedModeEnabled = false
    return container
}

function ensureContainer(state: SupportMetricsShareableStore) {
    if ('customersActivity' in state) {
        state.container = (state as any).customersActivity
        delete (state as any).customersActivity
    }
}

export function setsValidator(state: SupportMetricsShareableStore): Array<SetState> {
    ensureSets(state)
    const sets = defaultSetsValidator(state.sets)
    for (const set of sets) {
        if (set.percentile === undefined)
            set.percentile = DEFAULT_SET.percentile

        if (set.ticketsTypes === undefined || set.ticketsTypes.values.length === 0)
            set.ticketsTypes = DEFAULT_SET.ticketsTypes

        // This is for backward compatibility in case tag value is plain number, not str number in brackets.
        if (set.ticketsTags !== undefined)
            set.ticketsTags.values = set.ticketsTags.values.map(x => x.toString().includes('(') ? x : `(${x})`)
    }
    return sets
}

function ensureSets(state: SupportMetricsShareableStore) {
    if ('customersActivitySets' in state) {
        state.sets = (state as any).customersActivitySets
        delete (state as any).customersActivitySets
    }
}
