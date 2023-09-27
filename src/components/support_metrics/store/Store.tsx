import { configureMultisetContainerStore } from '../../common/store/multiset_container/Store'
import { containerReducer } from './ContainerReducer'
import { setsReducer, SetState } from './SetsReducer'
import { storeValidator } from './StoreStateValidator'
import { MultisetContainerStore } from '../../common/store/multiset_container/Store'
import { ContainerState } from './ContainerReducer'

export const SUPPORT_METRICS_STORE_NAME = 'support_metrics'

export const supportMetricsStore = configureMultisetContainerStore(
    SUPPORT_METRICS_STORE_NAME,
    containerReducer,
    setsReducer,
    storeValidator
)

export type SupportMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type SupportMetricsShareableStore = MultisetContainerStore<ContainerState, SetState>

export function getShareableState(): MultisetContainerStore {
    return supportMetricsStore.getState()
}
