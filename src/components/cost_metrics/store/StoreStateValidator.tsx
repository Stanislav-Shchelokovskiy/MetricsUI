import { CostMetricsStore, CostMetricsShareableStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { defaultContainerValidator, defaultSetsValidator } from '../../common/store/multiset_container/StoreStateValidator'

export function stateValidator(state: CostMetricsStore): CostMetricsStore {
    return {
        container: containerValidator(state),
        sets: setsValidator(state),
    }
}

export function containerValidator(state: CostMetricsShareableStore): ContainerState {
    return defaultContainerValidator(state.container, CONTEXT)
}

export function setsValidator(state: CostMetricsShareableStore): Array<SetState> {
    return defaultSetsValidator(state.sets)
}
