import { configureMultisetContainerStore, MultisetContainerStore } from '../../common/store/multiset_container/Store'
import { stateValidator } from './StoreStateValidator'
import { containerReducer, ContainerState } from './ContainerReducer'
import { setsReducer, SetState } from './sets/SetsReducer'

export const PERFORMANCE_METRICS_STORE_NAME = 'performance_metrics'

export const performanceMetricsStore = configureMultisetContainerStore(
    PERFORMANCE_METRICS_STORE_NAME,
    containerReducer,
    setsReducer,
    stateValidator
)

export type PerformanceMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type PerformanceMetricsShareableStore = MultisetContainerStore<ContainerState, SetState>

export function getShareableState(): MultisetContainerStore {
    return performanceMetricsStore.getState()
}
