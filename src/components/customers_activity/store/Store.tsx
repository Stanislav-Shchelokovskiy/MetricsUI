import { configureMultisetContainerStore } from '../../common/store/multiset_container/Store'
import { containerReducer } from './ContainerReducer'
import { setsReducer } from './SetsReducer'
import { storeValidator } from './StoreStateValidator'
import { MultisetContainerStore, MultisetContainerShareableStore } from '../../common/store/multiset_container/Store'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets_reducer/Interfaces'

export const customersActivityStore = configureMultisetContainerStore(
    'current_customers_activity_state_v1',
    containerReducer,
    setsReducer,
    storeValidator
)

export type CustomersActivityStore = MultisetContainerStore<ContainerState, SetState>
export type CustomersActivityShareableStore = MultisetContainerShareableStore<ContainerState, SetState>
