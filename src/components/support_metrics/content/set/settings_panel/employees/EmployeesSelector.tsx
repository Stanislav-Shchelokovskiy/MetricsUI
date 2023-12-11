import React from 'react'
import { useSelector } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../../../common/Typing'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeEmployees, changeEmployeesInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmployees, Employee } from '../../../../network_resource_fetcher/employees/FetchEmployees'
import { StringFilterParameters } from '../../../../../common/store/multiset_container/sets/Interfaces'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import {
    positionsSelector,
    empTribesSelector,
    empTentsSelector,
    employeesSelector,
    rolesSelector,
    employeesSelectorName
} from '../../../../../common/store/multiset_container/sets/selectors/Employees'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function EmployeesSelector() {
    return <EmpSelector
        placeholder='Select posts owners'
        label='Employees (posts owners)'
        valueSelector={employeesSelector}
        changeSelection={changeEmployees}
        changeInclude={changeEmployeesInclude}
        decomposePropName={employeesSelectorName}
    />
}


export interface EmpSelectorProps {
    placeholder: string
    label: string
    valueSelector: (store: SupportMetricsStore, setTitle: string) => StringFilterParameters
    changeSelection: (payload: Payload<string, Array<string>>) => PayloadAction<Payload<string, Array<string>>>
    changeInclude: (payload: Payload<string, boolean>) => PayloadAction<Payload<string, boolean>>
    decomposePropName: string
}

export function EmpSelector(props: EmpSelectorProps) {
    const setTitle = useSetTitle()

    const positions = useSelector((store: SupportMetricsStore) => positionsSelector(store, setTitle))
    const tribes = useSelector((store: SupportMetricsStore) => empTribesSelector(store, setTitle))
    const tents = useSelector((store: SupportMetricsStore) => empTentsSelector(store, setTitle))
    const roles = useSelector((store: SupportMetricsStore) => rolesSelector(store, setTitle))
    const fetchArgs = [paramOrDefault(positions), paramOrDefault(tribes), paramOrDefault(tents), paramOrDefault(roles)]

    const value = useSelector((store: SupportMetricsStore) => props.valueSelector(store, setTitle))
    const onValueChange = (allValues: Array<Employee>, values: Array<string>) => props.changeSelection({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => props.changeInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, props.decomposePropName)

    return <MultiOptionSelector<Employee, string>
        displaySelector='name'
        valueSelector='scid'
        placeholder={props.placeholder}
        label={props.label}
        fetchDataSource={fetchEmployees}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
}
