import { configureStore, PayloadAction } from '@reduxjs/toolkit'
import { loadState, saveState } from '../../LocalStorage'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'

export interface MultisetContainerStore<ContainerState = BaseContainerState, SetState = BaseSetState> {
    container: ContainerState
    sets: Array<SetState>
}

type ContainerReducer<ContainerState> = (state: ContainerState | undefined, action: PayloadAction) => ContainerState
type SetsReducer<SetState> = (state: Array<SetState> | undefined, action: PayloadAction) => Array<SetState>

interface reducer<ContainerState, SetState> {
    container: ContainerReducer<ContainerState>
    sets: SetsReducer<SetState>,
}
interface config<ContainerState, SetState> {
    storeName: string,
    reducer: reducer<ContainerState, SetState>,
    storeStateValidator: (state: MultisetContainerStore<ContainerState, SetState>) => MultisetContainerStore,
}

export function configureMultisetContainerStore<ContainerState extends BaseContainerState, SetState extends BaseSetState>(
    { storeName, reducer, storeStateValidator }: config<ContainerState, SetState>
) {
    const store = configureStore<MultisetContainerStore<ContainerState, SetState>, PayloadAction>({
        reducer: reducer,
        preloadedState: loadValidState()
    })

    function loadValidState() {
        let storedState = loadState(storeName)
        if (storedState !== undefined)
            storedState = storeStateValidator(storedState)
        return storedState
    }

    store.subscribe(() => {
        saveState(store.getState(), storeName);
    })

    return store
}

export function getReducer<ContainerState extends BaseContainerState, SetState extends BaseSetState>(
    containerReducer: ContainerReducer<ContainerState>,
    setsReducer: SetsReducer<SetState>,
) {
    return {
        container: containerReducer,
        sets: setsReducer,
    }
}
