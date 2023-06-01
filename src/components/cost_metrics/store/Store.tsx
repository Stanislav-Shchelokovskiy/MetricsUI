import { configureMultisetContainerStore } from '../../common/store/multiset_container/Store'
import { containerReducer } from './ContainerReducer'
import { setsReducer } from './sets_reducer/SetsReducer'
import { stateValidator } from './StoreStateValidator'
import { MultisetContainerStore, MultisetContainerShareableStore } from '../../common/store/multiset_container/Store'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from './sets_reducer/SetsReducer'

export const costMetricsStore = configureMultisetContainerStore(
    'cost_metrics',
    containerReducer,
    setsReducer,
    stateValidator
)

export type CostMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type CostMetricsShareableStore = MultisetContainerShareableStore<ContainerState, SetState>
