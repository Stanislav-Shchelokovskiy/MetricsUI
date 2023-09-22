import { PerformanceMetricsStore, PerformanceMetricsShareableStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { defaultContainerValidator, defaultSetsValidator } from '../../common/store/multiset_container/StoreStateValidator'

export function stateValidator(state: PerformanceMetricsStore): PerformanceMetricsStore {
    return {
        container: containerValidator(state),
        sets: setsValidator(state),
    }
}

export function containerValidator(state: PerformanceMetricsShareableStore): ContainerState {
    return defaultContainerValidator(state.container, CONTEXT)
}

export function setsValidator(state: PerformanceMetricsShareableStore): Array<SetState> {
    return defaultSetsValidator(state.sets)
}
