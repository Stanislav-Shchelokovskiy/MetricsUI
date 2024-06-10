import React, { useEffect, useState, PropsWithChildren } from 'react'
import { useDispatch, useSelector, Provider } from 'react-redux'
import { changeVersion } from '../common/store/view_state/Actions'
import { versionSelector } from '../common/store/view_state/Selectors'
import {
    stateNamesSelector,
    saltSelector,
} from '../common/store/view_state/Selectors'
import getStorageItemKey from '../common/components/state_management/Utils'
import { loadState, saveState } from '../common/LocalStorage'
import { BaseSetState } from '../common/store/multiset_container/sets/Interfaces'
import { contextOrDefault } from '../common/store/multiset_container/Context'
import { isSupportContextSelected, isCostContextSelected, isPerformanceContextSelected } from '../common/store/multiset_container/Context'
import { Context } from '../common/store/multiset_container/Context'
import {
    tribeNamesToIDs,
    tentNamesToIDs,
    positionsNamesToIDS,
    crmidsToSCIDS,
} from '../common/network_resource_fetcher/converters/Values'
import { useNotificationContext } from '../app_components/ErrorNotifier'
import { getStoreConfig as supportConfig } from '../support_metrics/store/Store'
import { getStoreConfig as costConfig } from '../cost_metrics/store/Store'
import { getStoreConfig as performanceConfig } from '../performance_metrics/store/Store'
import { viewStore } from '../common/store/multiset_container/ViewStore'
import { preValidateState } from '../common/store/multiset_container/StoreStateValidator'
import { MultisetContainerStore } from '../common/store/multiset_container/Store'


const NEW_VERSION = '2'

export default function LocalStatesConverter(props: PropsWithChildren) {
    const [conversion, completeConversion] = useState(conversionStatus(false, ''))

    const notificationContext = useNotificationContext()
    notificationContext.push(conversion.error)

    if (conversion.completed)
        return <> {props.children} </>
    return <Provider store={viewStore}>
        <LocalStatesConverterInner completeConversion={completeConversion} />
    </Provider>
}

interface Props {
    completeConversion: (s: ConversionStatus) => void
}

function LocalStatesConverterInner(props: Props) {
    const version = useSelector(versionSelector)
    const stateNames = useSelector(stateNamesSelector)
    const salt = useSelector(saltSelector)
    const dispatch = useDispatch()

    const converted = (error: string = '') => {
        props.completeConversion(conversionStatus(true, error))
    }

    useEffect(() => {
        if (version === NEW_VERSION) {
            converted()
            return
        }

        const onSuccess = () => {
            dispatch(changeVersion(NEW_VERSION))
            converted()
        }
        const onError = (message: string) => { converted(message) }

        (async () => await convertLocalStates(onSuccess, onError, salt, stateNames))();
    }, [])

    return null
}

interface ConversionStatus {
    completed: boolean
    error: string
}

function conversionStatus(completed: boolean, error: string) {
    return {
        completed: completed,
        error: error
    }
}

async function convertLocalStates(
    onSuccess: () => void,
    onError: (message: string) => void,
    salt: string,
    stateNames: Array<string>,
) {
    const currentStatesNames = Array<string>()

    return await Promise.all([
        ...stateNames.map(stateName => {
            const key = getStorageItemKey(salt, stateName)
            return convertStateAndSave(key)
        }),
        ...currentStatesNames.map(stateName => convertStateAndSave(stateName)),
    ]).then(
        (values) => onSuccess(),
        (reason) => {
            console.log(reason)
            onError(`Cannot convert some local states. Reason: ${reason}`)
        }
    )
}

async function convertStateAndSave(key: string) {
    const state = loadState<MultisetContainerStore>(key)
    if (state == null)
        return

    const convertedState = await convertState(state)
    saveState(convertedState, key)
}

export async function convertState(state: MultisetContainerStore, context: Context | undefined = undefined) {
    context = getContext(state, context)

    state = validateState(context, state)

    if (versionIsActual(state))
        return state

    state.sets = await convertSets(state.sets, context)

    updateVersion(state)
    return state
}

function versionIsActual(state: MultisetContainerStore) {
    return state.container.version === NEW_VERSION
}

function updateVersion(state: MultisetContainerStore) {
    state.container.version = NEW_VERSION
}

async function convertSets(sets: Array<BaseSetState>, context: Context) {
    for (const set of sets) {
        if (isPerformanceContextSelected(context)) {
            await convertPositions(set)
        }

        if (isCostContextSelected(context)) {
            await Promise.all([
                convertEmpTtribes(set),
                convertEmpTents(set),
                convertPositions(set),
                convertEmployees(set),
            ])
        }
    }

    return sets
}

async function convertEmployees(set: BaseSetState) {
    if (set.employees) {
        const employees = await crmidsToSCIDS(set.employees.values)
        if (employees.success) {
            set.employees.values = employees.data
        }
    }
}

async function convertEmpTtribes(set: BaseSetState) {
    if (set.empTribes) {
        const empTribes = await tribeNamesToIDs(set.empTribes.values)
        if (empTribes.success) {
            set.empTribes.values = empTribes.data
        }
    }
}

async function convertEmpTents(set: BaseSetState) {
    if (set.empTents) {
        const empTents = await tentNamesToIDs(set.empTents.values)
        if (empTents.success) {
            set.empTents.values = empTents.data
        }
    }
}

async function convertPositions(set: BaseSetState) {
    if (set.positions) {
        const positions = await positionsNamesToIDS(set.positions.values)
        if (positions.success) {
            set.positions.values = positions.data
        }
    }
}

function validateState(context: Context, state: any) {
    const config = getConfig(context)
    return config.validator(state)
}

function getConfig(context: Context) {
    if (isSupportContextSelected(context))
        return supportConfig()
    if (isCostContextSelected(context))
        return costConfig()
    if (isPerformanceContextSelected(context))
        return performanceConfig()
    throw new Error(`Config for context #${context} is missing.`);
}

function getContext(state: MultisetContainerStore, context?: Context) {
    if (context !== undefined)
        return context

    preValidateState(state)
    return contextOrDefault(state.container.context)
}
