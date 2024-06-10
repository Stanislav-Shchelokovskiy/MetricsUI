import { MultisetContainerStore, getReducer, Config } from '../../common/store/multiset_container/Store'
import { containerReducer } from './ContainerReducer'
import { setsReducer } from './sets/SetsReducer'
import { SetState } from './sets/Interfaces'
import { ContainerState } from './ContainerReducer'
import { stateValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { containerValidator, setsValidator } from './StoreStateValidator'
import { INITIAL_STATE } from './ContainerReducer'
import { DEFAULT_SET } from './sets/Defaults'


const config: Config<ContainerState, SetState> = {
    reducer: getReducer(containerReducer, setsReducer),
    validator: stateValidator(containerValidator, setsValidator),
    containerKeysSource: INITIAL_STATE,
    setKeysSource: DEFAULT_SET,
}

export function getStoreConfig() {
    return config
}

export type SupportMetricsStore = MultisetContainerStore<ContainerState, SetState>
