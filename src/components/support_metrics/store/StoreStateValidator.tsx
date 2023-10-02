import { SupportMetricsShareableStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { DEFAULT_SET } from './sets/Defaults'
import { SetState } from './sets/Interfaces'
import { containerValidator as validateContainer, setsValidator as validateSets } from '../../common/store/multiset_container/StoreStateValidator'


export function containerValidator(state: SupportMetricsShareableStore): ContainerState {
    ensureContainer(state)
    const customValidator = (container: ContainerState) => {
        if (container.baselineAlignedModeEnabled === undefined)
            container.baselineAlignedModeEnabled = false
        return container
    }
    return validateContainer(state.container, CONTEXT, customValidator)
}

function ensureContainer(state: SupportMetricsShareableStore) {
    if ('customersActivity' in state) {
        state.container = (state as any).customersActivity
        delete (state as any).customersActivity
    }
}

export function setsValidator(state: SupportMetricsShareableStore): Array<SetState> {
    ensureSets(state)
    const customValidator = (set: SetState) => {
        if (set.percentile === undefined)
            set.percentile = DEFAULT_SET.percentile

        if (set.ticketsTypes === undefined || set.ticketsTypes.values.length === 0)
            set.ticketsTypes = DEFAULT_SET.ticketsTypes

        // This is for backward compatibility in case tag value is plain number, not str number in brackets.
        if (set.ticketsTags !== undefined)
            set.ticketsTags.values = set.ticketsTags.values.map(x => x.toString().includes('(') ? x : `(${x})`)
        return set
    }
    return validateSets(state.sets, customValidator)
}

function ensureSets(state: SupportMetricsShareableStore) {
    if ('customersActivitySets' in state) {
        state.sets = (state as any).customersActivitySets
        delete (state as any).customersActivitySets
    }
}
