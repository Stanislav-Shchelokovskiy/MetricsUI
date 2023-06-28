import { configureMultisetContainerStore } from '../../common/store/multiset_container/Store'
import { containerReducer } from './ContainerReducer'
import { setsReducer } from './SetsReducer'
import { storeValidator } from './StoreStateValidator'
import { MultisetContainerStore } from '../../common/store/multiset_container/Store'
import { ContainerState } from './ContainerReducer'
import { SetState } from './sets/Interfaces'

export const supportMetricsStore = configureMultisetContainerStore(
    'current_customers_activity_state_v1',
    containerReducer,
    setsReducer,
    storeValidator
)

export type SupportMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type SupportMetricsShareableStore = MultisetContainerStore<ContainerState, SetState>

