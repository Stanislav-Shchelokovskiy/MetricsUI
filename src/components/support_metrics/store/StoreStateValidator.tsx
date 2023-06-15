import { SupportMetricsShareableStore } from './Store'
import { ContainerState } from './ContainerReducer'
import { SetState } from './sets/Interfaces'
import { DEFAULT_SET } from './sets/Defaults'
import { defaultContainerValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { toFriendlyTitle } from '../../common/store/multiset_container/Utils'

interface OldCustomersActivityShareableStore {
    customersActivity: ContainerState
    customersActivitySets: Array<SetState>
}

export function storeValidator({ customersActivity, customersActivitySets, ...remainder }: any) {
    const state = customersActivity ? {
        container: customersActivity,
        sets: customersActivitySets,
        ...remainder,
    } : remainder
    state.container = containerValidator(state)
    state.sets = setsValidator(state)
    return state
}

export function containerValidator(state: SupportMetricsShareableStore | OldCustomersActivityShareableStore): ContainerState {
    let container = 'customersActivity' in state ? state.customersActivity : state.container
    container = defaultContainerValidator(container)
    container.sets = container.sets.map(x => toFriendlyTitle(x))
    if (container.baselineAlignedModeEnabled === undefined)
        container.baselineAlignedModeEnabled = false
    return container
}

export function setsValidator(state: SupportMetricsShareableStore | OldCustomersActivityShareableStore): Array<SetState> {
    const customersActivitySets: Array<SetState> = 'customersActivitySets' in state ? state.customersActivitySets : state.sets
    for (const set of customersActivitySets) {
        set.title = toFriendlyTitle(set.title)

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
