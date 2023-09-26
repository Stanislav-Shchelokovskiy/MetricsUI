import { configureMultisetContainerStore } from '../../common/store/multiset_container/Store'
import { containerReducer } from './ContainerReducer'
import { setsReducer } from './sets/SetsReducer'
import { stateValidator } from './StoreStateValidator'
import { MultisetContainerStore } from '../../common/store/multiset_container/Store'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from './sets/SetsReducer'

export const COST_METRICS_STORE_NAME = 'cost_metrics'

export const costMetricsStore = configureMultisetContainerStore(
    COST_METRICS_STORE_NAME,
    containerReducer,
    setsReducer,
    stateValidator
)

export type CostMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type CostMetricsShareableStore = MultisetContainerStore<ContainerState, SetState>

export function getShareableState(): MultisetContainerStore {
    return costMetricsStore.getState()
}
