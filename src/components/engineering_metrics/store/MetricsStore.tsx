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

let prevContext = contextOrDefault(undefined)
function changeContext(ctx: Context) {
    if (ctx === prevContext)
        return
    prevContext = ctx

    reducer.changeContext(ctx)
    validator.changeContext(ctx)
    slicer.changeContext(ctx)
}

function config(ctx: Context) {
    changeContext(ctx)
    return {
        reducer: reducer.reducer,
        validator: validator.validator,
    }
}

interface StoreEx extends Store {
    changeContext: (ctx: Context) => void,
    getShareableState: () => MultisetContainerStore
}

const store = configureMultisetContainerStore('multiset_store', config)

export const multisetStore: StoreEx = {
    ...store,
    changeContext: changeContext,
    getShareableState: () => slicer.slice(store.getState()),
}
