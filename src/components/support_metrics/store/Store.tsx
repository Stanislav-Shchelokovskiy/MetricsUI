import { configureMultisetContainerStore } from '../../common/store/multiset_container/Store'
import { containerReducer } from './ContainerReducer'
import { setsReducer } from './sets/SetsReducer'
import { SetState } from './sets/Interfaces'
import { MultisetContainerStore } from '../../common/store/multiset_container/Store'
import { ContainerState } from './ContainerReducer'
import { stateValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { containerValidator, setsValidator } from './StoreStateValidator'

export const SUPPORT_METRICS_STORE_NAME = 'support_metrics'

export const supportMetricsStore = configureMultisetContainerStore(
    SUPPORT_METRICS_STORE_NAME,
    containerReducer,
    setsReducer,
    stateValidator(containerValidator, setsValidator)
)

export type SupportMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type SupportMetricsShareableStore = MultisetContainerStore<ContainerState, SetState>

export function getShareableState(): MultisetContainerStore {
    return supportMetricsStore.getState()
}
