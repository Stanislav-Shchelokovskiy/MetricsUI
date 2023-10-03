import { MultisetContainerStore, getReducer } from '../../common/store/multiset_container/Store'
import { containerReducer, ContainerState } from './ContainerReducer'
import { setsReducer, SetState } from './sets/SetsReducer'
import { stateValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { containerValidator, setsValidator } from './StoreStateValidator'
import { Config } from '../../common/store/multiset_container/Store'
import { INITIAL_STATE } from './ContainerReducer'
import { DEFAULT_SET } from './sets/SetsReducer'


const config: Config<ContainerState, SetState> = {
    storeName: 'performance_metrics',
    reducer: getReducer(containerReducer, setsReducer),
    validator: stateValidator(containerValidator, setsValidator),
    containerKeysSource: INITIAL_STATE,
    setKeysSource: DEFAULT_SET,
}

export function getStoreConfig() {
    return config
}

export type PerformanceMetricsStore = MultisetContainerStore<ContainerState, SetState>
