import { configureStore, PayloadAction } from '@reduxjs/toolkit'
import { loadState, saveState } from '../../LocalStorage'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'

export interface MultisetContainerStore<ContainerStateT = BaseContainerState, SetStateT = BaseSetState> {
    container: ContainerStateT
    sets: Array<SetStateT>
}

export function configureMultisetContainerStore<ContainerStateT extends BaseContainerState, SetStateT extends BaseSetState>(
    stateKey: string,
    containerReducer: (state: ContainerStateT | undefined, action: PayloadAction) => ContainerStateT,
    setsReducer: (state: Array<SetStateT> | undefined, action: PayloadAction) => Array<SetStateT>,
    storeStateValidator: (state: MultisetContainerStore<ContainerStateT, SetStateT>) => MultisetContainerStore,
) {
    const store = configureStore<MultisetContainerStore<ContainerStateT, SetStateT>, PayloadAction>({
        reducer: {
            container: containerReducer,
            sets: setsReducer,
        },
        preloadedState: loadValidState()
    })

    function loadValidState() {
        let storedState = loadState(stateKey)
        if (storedState !== undefined)
            storedState = storeStateValidator(storedState)
        return storedState
    }

    store.subscribe(() => {
        saveState(store.getState(), stateKey);
    })

    return store
}

export function getShareableState(state: MultisetContainerStore): MultisetContainerStore {
    return state
}
