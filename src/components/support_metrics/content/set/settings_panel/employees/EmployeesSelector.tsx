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
import { positionsSelector, empTribesSelector, empTentsSelector, employeesSelector, rolesSelector } from '../../../../../common/store/multiset_container/sets/selectors/Employees'



export default function EmployeesSelector() {
    return <EmpSelector
        className='CustomersActivity_EmployeesSelector'
        placeholder='Select posts owners'
        label='Employees (posts owners)'
        valueSelector={employeesSelector}
        changeSelection={changeEmployees}
        changeInclude={changeEmployeesInclude}
        positionsSelector={positionsSelector}
        tribesSelector={empTribesSelector}
        tentsSelector={empTentsSelector}
        rolesSelector={rolesSelector}
    />
}


export interface EmpSelectorProps {
    className: string
    placeholder: string
    label: string
    valueSelector: (store: SupportMetricsStore, setTitle: string) => StringFilterParameters
    changeSelection: (payload: Payload<string, Array<string>>) => PayloadAction<Payload<string, Array<string>>>
    changeInclude: (payload: Payload<string, boolean>) => PayloadAction<Payload<string, boolean>>
    positionsSelector: (store: SupportMetricsStore, setTitle: string) => StringFilterParameters
    tribesSelector: (store: SupportMetricsStore, setTitle: string) => StringFilterParameters
    tentsSelector: (store: SupportMetricsStore, setTitle: string) => StringFilterParameters
    rolesSelector: (store: SupportMetricsStore, setTitle: string) => StringFilterParameters
}

export function EmpSelector(props: EmpSelectorProps) {
    const setTitle = useSetTitle()

    const positions = useSelector((store: SupportMetricsStore) => props.positionsSelector(store, setTitle))
    const tribes = useSelector((store: SupportMetricsStore) => props.tribesSelector(store, setTitle))
    const tents = useSelector((store: SupportMetricsStore) => props.tentsSelector(store, setTitle))
    const roles = useSelector((store: SupportMetricsStore) => props.rolesSelector(store, setTitle))
    const fetchArgs = [paramOrDefault(positions), paramOrDefault(tribes), paramOrDefault(tents), paramOrDefault(roles)]

    const value = useSelector((store: SupportMetricsStore) => props.valueSelector(store, setTitle))
    const onValueChange = (allValues: Array<Employee>, values: Array<string>) => props.changeSelection({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => props.changeInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Employee, string>
        className={props.className}
        displayExpr='name'
        valueExpr='scid'
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
    />
}

const defaultProps = {
    positionsSelector: (store: SupportMetricsStore, setTitle: string) => undefined,
    tribesSelector: (store: SupportMetricsStore, setTitle: string) => undefined,
    tentsSelector: (store: SupportMetricsStore, setTitle: string) => undefined,
}
EmpSelector.defaultProps = defaultProps
