import { combineReducers, configureStore, PayloadAction } from '@reduxjs/toolkit'
import { loadState, saveState } from '../../LocalStorage'
import { BaseContainerState } from './BaseContainerState'
import { BaseSetState } from './sets/Interfaces'
import { Context, contextOrDefault } from './Context'

export interface MultisetContainerStore<ContainerState = BaseContainerState, SetState = BaseSetState> {
    container: ContainerState
    sets: Array<SetState>
}

type ContainerReducer<ContainerState> = (state: ContainerState | undefined, action: PayloadAction) => ContainerState
type SetsReducer<SetState> = (state: Array<SetState> | undefined, action: PayloadAction) => Array<SetState>


interface config<ContainerState, SetState> {
    reducer: (state: MultisetContainerStore<ContainerState, SetState> | undefined, action: PayloadAction) => MultisetContainerStore<ContainerState, SetState>,
    validator: (state: MultisetContainerStore<ContainerState, SetState>) => MultisetContainerStore<ContainerState, SetState>,
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

    const store = configureStore<MultisetContainerStore<ContainerState, SetState>, PayloadAction>({
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
