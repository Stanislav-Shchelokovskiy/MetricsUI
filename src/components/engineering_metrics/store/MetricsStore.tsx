import { PayloadAction } from '@reduxjs/toolkit'
import { Store } from '@reduxjs/toolkit'
import {
    isSupportContextSelected,
    isCostContextSelected,
    isPerformanceContextSelected,
    Context
} from '../../common/store/multiset_container/Context'
import { configureMultisetContainerStore, MultisetContainerStore } from '../../common/store/multiset_container/Store'

import { BaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { BaseSetState } from '../../common/store/multiset_container/sets/Interfaces'
import { getStoreConfig as getSupportConfig } from '../../support_metrics/store/Store'
import { getStoreConfig as getCostConfig } from '../../cost_metrics/store/Store'
import { getStoreConfig as getPerformanceConfig } from '../../performance_metrics/store/Store'
import { contextOrDefault } from '../../common/store/multiset_container/Context'
import { getStateSlice } from '../../common/store/multiset_container/Store'
import { validateState } from '../../common/store/multiset_container/Actions'

export const CONTEXT = Context.Performance

function getConfig(ctx: Context) {
    if (isSupportContextSelected(ctx))
        return getSupportConfig()

    if (isCostContextSelected(ctx))
        return getCostConfig()

    if (isPerformanceContextSelected(ctx))
        return getPerformanceConfig()

    throw new Error(`Config for context #${ctx} is missing.`)
}

function createReducer() {
    let context = contextOrDefault(undefined)
    let { reducer } = getConfig(context)

    function reduce(state: any, action: PayloadAction<any>): any {
        return reducer(state, action)
    }

    function changeContext(ctx: Context) {
        context = ctx;
        ({ reducer } = getConfig(context))
    }

    return {
        reducer: reduce,
        changeContext: changeContext,
    }
}

function createValidator() {
    let context = contextOrDefault(undefined)
    let { validator } = getConfig(context)

    function validate(state: any): any {
        return validator(state)
    }

    function changeContext(ctx: Context) {
        context = ctx;
        ({ validator } = getConfig(context))
    }

    return {
        validator: validate,
        changeContext: changeContext,
    }
}

function createSlicer() {
    let context = contextOrDefault(undefined)
    let { containerKeysSource, setKeysSource } = getConfig(context)

    function slice(state: any): any {
        return getStateSlice<BaseContainerState, BaseSetState>(containerKeysSource, setKeysSource, state)
    }

    function changeContext(ctx: Context) {
        context = ctx;
        ({ containerKeysSource, setKeysSource } = getConfig(context))
    }

    return {
        slice: slice,
        changeContext: changeContext,
    }
}


const reducer = createReducer()
const validator = createValidator()
const slicer = createSlicer()

function changeContext(ctx: Context, validate: boolean = false) {
    reducer.changeContext(ctx)
    validator.changeContext(ctx)
    slicer.changeContext(ctx)

    if (validate)
        store.dispatch(validateState(undefined))
}

const config = {
    storeName: 'multiset_store',
    reducer: reducer.reducer,
    validator: validator.validator,
}


interface StoreEx extends Store {
    changeContext: (ctx: Context, validate?: boolean) => void,
    getShareableState: () => MultisetContainerStore
}

const store = configureMultisetContainerStore(config)

export const multisetStore: StoreEx = {
    ...store,
    changeContext: changeContext,
    getShareableState: () => slicer.slice(store.getState()),
}
