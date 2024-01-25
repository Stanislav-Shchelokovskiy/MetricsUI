import { combineReducers, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { loadState, saveState } from '../../LocalStorage'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'
import { Context, contextOrDefault } from './Context'
import { NonShareableState } from './non_shareable_state/NonShareableState'
import { nonShareableReducer } from './non_shareable_state/NonShareableStateReducer'


export interface MultisetContainerStore<ContainerState = BaseContainerState, SetState = BaseSetState> {
    container: ContainerState
    sets: Array<SetState>
}

export interface MultisetContainerStoreEx<ContainerState = BaseContainerState, SetState = BaseSetState> extends MultisetContainerStore<ContainerState, SetState> {
    nonShareable: NonShareableState
}

type ContainerReducer<ContainerState> = (state: ContainerState | undefined, action: PayloadAction) => ContainerState
type SetsReducer<SetState> = (state: Array<SetState> | undefined, action: PayloadAction) => Array<SetState>
export type StateValidator<ContainerState, SetState> = (
    newState: MultisetContainerStore<ContainerState, SetState>,
    currentState?: MultisetContainerStore<ContainerState, SetState>,
) => MultisetContainerStore<ContainerState, SetState>

interface config<ContainerState, SetState> {
    reducer: (state: MultisetContainerStoreEx<ContainerState, SetState> | undefined, action: PayloadAction) => MultisetContainerStoreEx<ContainerState, SetState>,
    validator: StateValidator<ContainerState, SetState>,
}

export interface Config<ContainerState, SetState> extends config<ContainerState, SetState> {
    containerKeysSource: Readonly<ContainerState>,
    setKeysSource: Readonly<SetState>,
}

export function configureMultisetContainerStore<ContainerState extends BaseContainerState, SetState extends BaseSetState>(
    storeName: string,
    config: (ctx: Context) => config<ContainerState, SetState>,
) {
    let storedState = loadState(storeName) as MultisetContainerStore<ContainerState, SetState>
    const { reducer, validator } = config(contextOrDefault(storedState?.container?.context))
    if (storedState !== undefined)
        storedState = validator(storedState)

    const store = configureStore<MultisetContainerStoreEx<ContainerState, SetState>, PayloadAction>({
        reducer: reducer,
        preloadedState: storedState as any
    })

    store.subscribe(() => {
        saveState(store.getState(), storeName);
    })

    return store
}

export function getReducer<ContainerState extends BaseContainerState, SetState extends BaseSetState>(
    containerReducer: ContainerReducer<ContainerState>,
    setsReducer: SetsReducer<SetState>,
) {
    return combineReducers({
        container: containerReducer,
        sets: setsReducer,
        nonShareable: nonShareableReducer,
    })
}

export function getStateSlice<ContainerState extends BaseContainerState, SetState extends BaseSetState>(
    containerKeysSource: Readonly<ContainerState>,
    setKeysSource: Readonly<SetState>,
    sourceState: Readonly<MultisetContainerStore<ContainerState, SetState>>,
): MultisetContainerStore<ContainerState, SetState> {
    const container = {} as ContainerState

    for (const key in containerKeysSource) {
        container[key] = sourceState.container[key]
    }

    const sets = sourceState.sets.map(set => {
        const res = {} as SetState
        for (const key in setKeysSource) {
            res[key] = set[key]
        }
        return res
    })

    return {
        container: container,
        sets: sets,
    }
}
