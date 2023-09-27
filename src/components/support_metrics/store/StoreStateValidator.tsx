import { SupportMetricsShareableStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './SetsReducer'
import { DEFAULT_SET } from './sets/Defaults'
import { defaultContainerValidator, defaultSetsValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { toFriendlyTitle } from '../../common/store/multiset_container/Utils'
import { SupportMetricsStore } from './Store'

interface OldCustomersActivityShareableStore {
    customersActivity: ContainerState
    customersActivitySets: Array<SetState>
}

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

export function containerValidator(state: SupportMetricsShareableStore | OldCustomersActivityShareableStore): ContainerState {
    let container = 'customersActivity' in state ? state.customersActivity : state.container
    container = defaultContainerValidator(container, CONTEXT)
    container.sets = container.sets.map(x => toFriendlyTitle(x))
    if (container.baselineAlignedModeEnabled === undefined)
        container.baselineAlignedModeEnabled = false
    return container
}

export function setsValidator(state: SupportMetricsShareableStore | OldCustomersActivityShareableStore): Array<SetState> {
    const setsToValidate = 'customersActivitySets' in state ? state.customersActivitySets : state.sets as Array<SetState>
    const customersActivitySets = defaultSetsValidator(setsToValidate)
    for (const set of customersActivitySets) {
        if (set.percentile === undefined)
            set.percentile = DEFAULT_SET.percentile

        if (set.ticketsTypes === undefined || set.ticketsTypes.values.length === 0)
            set.ticketsTypes = DEFAULT_SET.ticketsTypes

        // This is for backward compatibility in case tag value is plain number, not str number in brackets.
        if (set.ticketsTags !== undefined)
            set.ticketsTags.values = set.ticketsTags.values.map(x => x.toString().includes('(') ? x : `(${x})`)
    }
    return customersActivitySets
}
