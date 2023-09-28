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
import { BaseContainerState } from '../common/store/multiset_container/BaseContainerState'
import { contextOrDefault } from '../common/store/multiset_container/Context'
import { isSupportContextSelected, isCostContextSelected, isPerformanceContextSelected } from '../common/store/multiset_container/Context'
import { Context } from '../common/store/multiset_container/Context'
import {
    tribeNamesToIDs,
    tentNamesToIDs,
    positionsNamesToIDS,
    crmidsToSCIDS,
} from '../common/network_resource_fetcher/converters/Values'
import { dropState } from '../common/LocalStorage'
import { useNotificationContext } from '../app_components/ErrorNotifier'
import { SUPPORT_METRICS_STORE_NAME } from '../support_metrics/store/Store'
import { COST_METRICS_STORE_NAME } from '../cost_metrics/store/Store'
import { PERFORMANCE_METRICS_STORE_NAME } from '../performance_metrics/store/Store'
import { setsValidator as costSetsValidator, containerValidator as costContainerValidator } from '../cost_metrics/store/StoreStateValidator'
import { setsValidator as supportSetsValidator, containerValidator as supportContainerValidator } from '../support_metrics/store/StoreStateValidator'
import { setsValidator as performanceSetsValidator, containerValidator as performanceContainerValidator } from '../performance_metrics/store/StoreStateValidator'
import { viewStore } from '../common/store/multiset_container/ViewStore'

const NEW_VERSION = '1'

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
    const current_states = [
        SUPPORT_METRICS_STORE_NAME,
        COST_METRICS_STORE_NAME,
        PERFORMANCE_METRICS_STORE_NAME,
    ]

    tryRenameCustomersActivityToSupportMetrics()

    return await Promise.all([
        ...stateNames.map(stateName => {
            const key = getStorageItemKey(salt, stateName)
            return convertStateAndSave(key)
        }),
        ...current_states.map(stateName => convertStateAndSave(stateName)),
    ]).then(
        (values) => onSuccess(),
        (reason) => {
            console.log(reason)
            onError(`Cannot convert some local states. Reason: ${reason}`)
        }
    )
}

async function tryRenameCustomersActivityToSupportMetrics() {
    const old_name = 'current_customers_activity_state_v1'
    const state = loadState(old_name)
    if (state) {
        saveState(state, SUPPORT_METRICS_STORE_NAME)
        dropState(old_name)
    }
}

async function convertStateAndSave(key: string) {
    const state = loadState(key)
    if (state == null)
        return

    const context = getContext(state)
    const convertedState = await convertState(context, state)
    saveState(convertedState, key)
}

export async function convertState(context: Context, state: any) {
    const [validContainer, validSets] = getValidators(context)
    const container = validContainer(state) as BaseContainerState
    state.container = container

    if (versionIsActual(container))
        return

    const sets = validSets(state) as Array<BaseSetState>
    state.sets = await convertSets(context, sets)

    updateVersion(container)
    return state
}

function versionIsActual(container: BaseContainerState) {
    return container.version === NEW_VERSION
}

function updateVersion(container: BaseContainerState) {
    container.version = NEW_VERSION
}

async function convertSets(context: Context, sets: Array<BaseSetState>) {
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

function getValidators(context: Context) {
    if (isSupportContextSelected(context))
        return [supportContainerValidator, supportSetsValidator]
    if (isCostContextSelected(context))
        return [costContainerValidator, costSetsValidator]
    if (isPerformanceContextSelected(context))
        return [performanceContainerValidator, performanceSetsValidator]
    throw new Error(`Validator for context #${context} is missing.`);
}

function getContext(state: any) {
    const container = getContainer(state)
    return contextOrDefault(container.context)
}

function getContainer(state: any) {
    return 'customersActivity' in state ? state.customersActivity : state.container as BaseContainerState
}
