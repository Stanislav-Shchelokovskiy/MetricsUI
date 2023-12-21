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
import { applyState as _applyState} from '../../common/store/view_state/Actions'
import {
    validateState as _validateState,
    changeMetric as _changeMetric,
} from '../../common/store/multiset_container/Actions'
import { metricSelector } from '../../common/store/multiset_container/Selectors'



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


let currentContext = contextOrDefault(undefined)
let prevContext = currentContext
function changeContext(ctx: Context) {
    prevContext = currentContext
    if (ctx === currentContext)
        return
    currentContext = ctx

    reducer.changeContext(ctx)
    validator.changeContext(ctx)
    slicer.changeContext(ctx)
}

function resetContext() {
    changeContext(prevContext)
}

function getContext(): Context {
    return currentContext
}

function getMetric(): string {
    return metricSelector(getStore().getState())
}

const store = configureMultisetContainerStore('multiset_store', config)
function getStore(): Store {
    return store
}

function validateState() {
    store.dispatch(_validateState(undefined))
}

function applyState(state: MultisetContainerStore) {
    store.dispatch(_applyState(state))
}

function config(ctx: Context) {
    changeContext(ctx)
    return {
        reducer: reducer.reducer,
        validator: validator.validator,
    }
}


interface StoreEx {
    changeContext: (ctx: Context) => void,
    resetContext: () => void,
    getContext: () => Context,
    getMetric: () => string,
    validateState: () => void,
    applyState: (state: MultisetContainerStore) => void,
    getShareableState: () => MultisetContainerStore
    getStore: () => Store,
}

export const multisetStore: StoreEx = {
    changeContext: changeContext,
    resetContext: resetContext,
    getContext: getContext,
    getMetric: getMetric,
    getStore: getStore,
    validateState: validateState,
    applyState: applyState,
    getShareableState: () => slicer.slice(getStore().getState()),
}
