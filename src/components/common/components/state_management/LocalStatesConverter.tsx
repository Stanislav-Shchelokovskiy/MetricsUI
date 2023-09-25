import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadIndicator from '../LoadIndicator'
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
import { positionsNamesToIDS } from '../../network_resource_fetcher/converters/fetch_convert/Positions'
import { tentNamesToIDs } from '../../network_resource_fetcher/converters/fetch_convert/Tents'
import { crmidsToSCIDS } from '../../network_resource_fetcher/converters/fetch_convert/Employees'


export default function LocalStatesConverter() {
    const newVersion = '1'
    const version = useSelector(versionSelector)
    const stateNames = useSelector(stateNamesSelector)
    const salt = useSelector(saltSelector)
    const dispatch = useDispatch()

    useEffect(() => {

        if (newVersion === version)
            return


        (async () => {
            // use stateNames
            await Promise.all(['TEST', 'TEST1'].map(stateName => {
                const key = getStorageItemKey(salt, stateName)
                return convertSetValues(key)
            }));
        }
        )();

        //dispatch(changeVersion(newVersion))
    }, [])

    if (newVersion === version)
        return null
    return <div className='Indicator'>
        <p>Converting states ...</p>
        <LoadIndicator width={undefined} height={25} />
    </div>
}

async function convertSetValues(key: string) {
    const state = loadState(key)
    const context = getContext(state)
    const validate = getSetsValidator(context)
    const sets = validate(state) as Array<BaseSetState>

    for (const set of sets) {
        if ((isPerformanceContextSelected(context) || isCostContextSelected(context)) && set.positions) {
            const positions = await positionsNamesToIDS(set.positions)
            if (positions.success) {
                set.positions = positions.data
            }
        }

        if (isCostContextSelected(context)) {
            if (set.empTents) {
                const empTents = await tentNamesToIDs(set.empTents)
                if (empTents.success) {
                    set.empTents = empTents.data
                }
            }
            if (set.employees) {
                const employees = await crmidsToSCIDS(set.employees)
                if (employees.success) {
                    set.employees = employees.data
                }
            }
        }

        if ((isPerformanceContextSelected(context) || isSupportContextSelected(context)) && set.tents) {
            const tents = await tentNamesToIDs(set.tents)
            if (tents.success) {
                set.tents = tents.data
            }
        }

    }

    state.sets = sets

    saveState(state, key)
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
