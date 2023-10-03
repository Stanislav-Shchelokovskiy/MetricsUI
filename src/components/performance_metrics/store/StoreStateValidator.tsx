import { PerformanceMetricsStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { containerValidator as validateContainer, setsValidator as ValidateSets } from '../../common/store/multiset_container/StoreStateValidator'

export function containerValidator(state: PerformanceMetricsStore): ContainerState {
    return validateContainer(state.container, CONTEXT, (container) => container)
}

export function setsValidator(state: PerformanceMetricsStore): Array<SetState> {
    return ValidateSets(state.sets, (set) => set)
}
