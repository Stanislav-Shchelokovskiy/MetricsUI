import { configureStore, PayloadAction } from '@reduxjs/toolkit'
import { loadState, saveState } from '../../LocalStorage'
import { ViewStateReducer } from '../state/Reducers'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'
import { ViewState } from '../state/Reducers'

export interface MultisetContainerShareableStore<ContainerStateT = BaseContainerState, SetStateT = BaseSetState> {
    container: ContainerStateT
    sets: Array<SetStateT>
}

export interface MultisetContainerStore<ContainerStateT = BaseContainerState, SetStateT = BaseSetState, ViewStateT = ViewState> extends MultisetContainerShareableStore<ContainerStateT, SetStateT> {
    viewState: ViewStateT
}

export function configureMultisetContainerStore<ContainerStateT extends BaseContainerState, SetStateT extends BaseSetState>(
    stateKey: string,
    containerReducer: (state: ContainerStateT | undefined, action: PayloadAction) => ContainerStateT,
    setsReducer: (state: Array<SetStateT> | undefined, action: PayloadAction) => Array<SetStateT>,
    storeStateValidator: (state: MultisetContainerStore<ContainerStateT, SetStateT>) => MultisetContainerStore,
) {
    const store = configureStore<MultisetContainerStore<ContainerStateT, SetStateT, ViewState>, PayloadAction>({
        reducer: {
            container: containerReducer,
            sets: setsReducer,
            viewState: ViewStateReducer,
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

export function getShareableState(state: MultisetContainerStore): MultisetContainerShareableStore {
    return {
        container: state.container,
        sets: state.sets
    }
}
