import { CostMetricsStore, CostMetricsShareableStore } from './Store'
import { ContainerState } from './ContainerReducer'
import { SetState } from './SetsReducer'
import { defaultContainerValidator } from '../../common/store/multiset_container/StoreStateValidator'

export function stateValidator(state: CostMetricsStore) {
    state.container = containerValidator(state)
    state.sets = setsValidator(state)
    return state
}

export function containerValidator(state: CostMetricsShareableStore): ContainerState {
    let container = state.container
    container = defaultContainerValidator(container)
    return container
}

export function setsValidator(state: CostMetricsShareableStore): Array<SetState> {
    return state.sets
}
