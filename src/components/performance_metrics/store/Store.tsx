import { configureMultisetContainerStore, MultisetContainerStore } from '../../common/store/multiset_container/Store'
import { stateValidator } from './StoreStateValidator'
import { containerReducer, ContainerState } from './ContainerReducer'
import { setsReducer, SetState } from './sets/SetsReducer'


export const performanceMetricsStore = configureMultisetContainerStore(
    'performance_metrics',
    containerReducer,
    setsReducer,
    stateValidator
)

export type PerformanceMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type PerformanceMetricsShareableStore = MultisetContainerStore<ContainerState, SetState>

export function getShareableState(): MultisetContainerStore {
    return performanceMetricsStore.getState()
}
