import { PerformanceMetricsShareableStore } from './Store'
import { ContainerState, CONTEXT } from './ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { containerValidator as validateContainer, setsValidator as ValidateSets } from '../../common/store/multiset_container/StoreStateValidator'

export function containerValidator(state: PerformanceMetricsShareableStore): ContainerState {
    return validateContainer(state.container, CONTEXT, (container) => container)
}

export function setsValidator(state: PerformanceMetricsShareableStore): Array<SetState> {
    return ValidateSets(state.sets, (set) => set)
}
