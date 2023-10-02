import { containerReducer } from './ContainerReducer'
import { setsReducer } from './sets/SetsReducer'
import { configureMultisetContainerStore, MultisetContainerStore, getReducer } from '../../common/store/multiset_container/Store'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from './sets/SetsReducer'
import { stateValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { containerValidator, setsValidator } from './StoreStateValidator'


const config = {
    storeName: 'cost_metrics',
    reducer: getReducer(containerReducer, setsReducer),
    storeStateValidator: stateValidator(containerValidator, setsValidator),
}

const store = configureMultisetContainerStore(config)

export function getShareableState(): MultisetContainerStore {
    return store.getState()
}

export function getStoreConfig() {
    return config
}

export function getStore() {
    return store
}

export function getStorename() {
    return config.storeName
}


export type CostMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type CostMetricsShareableStore = MultisetContainerStore<ContainerState, SetState>
