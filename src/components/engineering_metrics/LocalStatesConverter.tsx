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
import { setsValidator as costSetsValidator } from '../cost_metrics/store/StoreStateValidator'
import { setsValidator as supportSetsValidator } from '../support_metrics/store/StoreStateValidator'
import { setsValidator as performanceSetsValidator } from '../performance_metrics/store/StoreStateValidator'
import { viewStore } from '../common/store/multiset_container/ViewStore'


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
    const newVersion = '1'
    const version = useSelector(versionSelector)
    const stateNames = useSelector(stateNamesSelector)
    const salt = useSelector(saltSelector)
    const dispatch = useDispatch()

    const converted = (error: string = '') => {
        props.completeConversion(conversionStatus(true, error))
    }

    useEffect(() => {
        if (version === newVersion) {
            converted()
            return
        }

        const onSuccess = () => {
            dispatch(changeVersion(newVersion))
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
            return convertSetsValues(key)
        }),
        ...current_states.map(stateName => convertSetsValues(stateName)),
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

async function convertSetsValues(key: string) {
    const state = loadState(key)
    if (state == null)
        return

    const context = getContext(state)
    const validate = getSetsValidator(context)
    const sets = validate(state) as Array<BaseSetState>

    for (const set of sets) {
        if (isPerformanceContextSelected(context)) {
            await convertPositions(set)
        }

        if (isCostContextSelected(context)) {
            await convertEmpTtribes(set)
            await convertEmpTents(set)
            await convertPositions(set)
            await convertEmployees(set)
        }
    }

    state.sets = sets
    saveState(state, key)
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

function getSetsValidator(context: Context) {
    if (isSupportContextSelected(context))
        return supportSetsValidator
    if (isCostContextSelected(context))
        return costSetsValidator
    return performanceSetsValidator
}

function getContext(state: any) {
    const container = 'customersActivity' in state ? state.customersActivity : state.container as BaseContainerState
    return contextOrDefault(container.context)
}
