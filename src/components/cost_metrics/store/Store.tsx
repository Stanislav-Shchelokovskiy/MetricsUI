import { containerReducer } from './ContainerReducer'
import { setsReducer } from './sets/SetsReducer'
import { MultisetContainerStore, getReducer } from '../../common/store/multiset_container/Store'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from './sets/Interfaces'
import { DEFAULT_SET } from './sets/Defaults'
import { stateValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { containerValidator, setsValidator } from './StoreStateValidator'
import { Config } from '../../common/store/multiset_container/Store'
import { INITIAL_STATE } from './ContainerReducer'


const config: Config<ContainerState, SetState> = {
    reducer: getReducer(containerReducer, setsReducer),
    validator: stateValidator(containerValidator, setsValidator),
    containerKeysSource: INITIAL_STATE,
    setKeysSource: DEFAULT_SET,
}

export function getStoreConfig() {
    return config
}

export type CostMetricsStore = MultisetContainerStore<ContainerState, SetState>
