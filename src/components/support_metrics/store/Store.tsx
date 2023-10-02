import { configureMultisetContainerStore, MultisetContainerStore, getReducer } from '../../common/store/multiset_container/Store'
import { containerReducer } from './ContainerReducer'
import { setsReducer } from './sets/SetsReducer'
import { SetState } from './sets/Interfaces'
import { ContainerState } from './ContainerReducer'
import { stateValidator } from '../../common/store/multiset_container/StoreStateValidator'
import { containerValidator, setsValidator } from './StoreStateValidator'

const config = {
    storeName: 'support_metrics',
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

export type SupportMetricsStore = MultisetContainerStore<ContainerState, SetState>
export type SupportMetricsShareableStore = MultisetContainerStore<ContainerState, SetState>
