import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeVersion } from '../../store/view_state/Actions'
import {
    stateNamesSelector,
    saltSelector,
    versionSelector
} from '../../store/view_state/Selectors'
import getStorageItemKey from './Utils'
import { loadState, saveState } from '../../LocalStorage'
import { BaseSetState } from '../../store/multiset_container/sets/Interfaces'
import { BaseContainerState } from '../../store/multiset_container/BaseContainerState'
import { contextOrDefault } from '../../store/multiset_container/Context'
import { isSupportContextSelected, isCostContextSelected, isPerformanceContextSelected } from '../../store/multiset_container/Context'
import { setsValidator as costSetsValidator } from '../../../cost_metrics/store/StoreStateValidator'
import { setsValidator as supportSetsValidator } from '../../../support_metrics/store/StoreStateValidator'
import { setsValidator as performanceSetsValidator } from '../../../performance_metrics/store/StoreStateValidator'
import { Context } from '../../store/multiset_container/Context'
import {
    tribeNamesToIDs,
    tentNamesToIDs,
    positionsNamesToIDS,
    crmidsToSCIDS,
} from '../../network_resource_fetcher/converters/Values'
import TaskProgressNotifier from '../TaskProgressNotifier'
import { dropState } from '../../LocalStorage'
import { SUPPORT_METRICS_STORE_NAME } from '../../../support_metrics/store/Store'
import { COST_METRICS_STORE_NAME } from '../../../cost_metrics/store/Store'
import { PERFORMANCE_METRICS_STORE_NAME } from '../../../performance_metrics/store/Store'


export default function LocalStatesConverter() {
    const newVersion = '1'
    const version = useSelector(versionSelector)
    const stateNames = useSelector(stateNamesSelector)
    const salt = useSelector(saltSelector)
    const dispatch = useDispatch()

    const task = async (
        dispatchTaskState: (started: boolean) => void,
        onSuccess: (message: string) => void,
        onError: (message: string) => void
    ) => {
        const onSuccessWrapper = (message: string) => {
            // onSuccess(message)
            dispatch(changeVersion(newVersion))
        }
        await convertLocalStates(onSuccessWrapper, onError, salt, stateNames)
    }

    if (version !== newVersion)
        return <TaskProgressNotifier
            task={task}
            autoStartTask={true} />
    return <div></div>
}

async function convertLocalStates(
    onSuccess: (message: string) => void,
    onError: (message: string) => void,
    salt: string,
    stateNames: Array<string>,
) {
    const current_states = [SUPPORT_METRICS_STORE_NAME, COST_METRICS_STORE_NAME, PERFORMANCE_METRICS_STORE_NAME]
    return await Promise.all([
        tryRenameCustomersActivityToSupportMetrics(),
        ...stateNames.map(stateName => {
            const key = getStorageItemKey(salt, stateName)
            return convertSetsValues(key)
        }),
        ...current_states.map(stateName => convertSetsValues(stateName)),
    ]).then(
        (values) => { onSuccess(`All ${values.length} local states are converted`) },
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
