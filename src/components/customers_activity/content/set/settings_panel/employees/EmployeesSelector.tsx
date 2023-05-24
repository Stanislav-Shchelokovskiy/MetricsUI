import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../../../common/Interfaces'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeEmployees, changeEmployeesInclude } from '../../../../../common/store/set_container/sets/actions/Employees'
import { fetchEmployees, Employee } from '../../../../network_resource_fetcher/employees/FetchEmployees'
import { FilterParametersNode } from '../../../../../common/store/set_container/sets/Interfaces'
import { paramOrDefault } from '../../../../../common/store/set_container/sets/Utils'
import { Set } from '../../../../store/sets_reducer/Interfaces'

export interface EmpSelectorProps {
    setTitle: string
    className: string
    placeholder: string
    label: string
    valueSelector: (x: Set | undefined) => FilterParametersNode<string> | undefined
    changeSelection: (payload: Payload<string, Array<string>>) => PayloadAction<Payload<string, Array<string>>>
    changeInclude: (payload: Payload<string, boolean>) => PayloadAction<Payload<string, boolean>>
    positionsSelector: (x: Set | undefined) => FilterParametersNode<string> | undefined
    tribesSelector: (x: Set | undefined) => FilterParametersNode<string> | undefined
    tentsSelector: (x: Set | undefined) => FilterParametersNode<string> | undefined
}


export default function EmployeesSelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: Set | undefined) => x?.employees, [])
    const positionsSelector = useCallback((x: Set | undefined) => x?.positions, [])
    const tribesSelector = useCallback((x: Set | undefined) => x?.empTribes, [])
    const tentsSelector = useCallback((x: Set | undefined) => x?.empTents, [])
    return <EmpSelector
        setTitle={setTitle}
        className='CustomersActivity_EmployeesSelector'
        placeholder='Select posts owners'
        label='Employees (posts owners)'
        valueSelector={valueSelector}
        changeSelection={changeEmployees}
        changeInclude={changeEmployeesInclude}
        positionsSelector={positionsSelector}
        tribesSelector={tribesSelector}
        tentsSelector={tentsSelector}
    />
}

export function EmpSelector(props: EmpSelectorProps) {
    const setTitle = props.setTitle
    const findSet = useCallback((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle), [setTitle])

    const positionsNode = useSelector((store: CustomersActivityStore) => props.positionsSelector?.(findSet(store)))
    const tribesNode = useSelector((store: CustomersActivityStore) => props.tribesSelector?.(findSet(store)))
    const tentsNode = useSelector((store: CustomersActivityStore) => props.tentsSelector?.(findSet(store)))
    const fetchArgs = [paramOrDefault(positionsNode), paramOrDefault(tribesNode), paramOrDefault(tentsNode)]

    const value = useSelector((store: CustomersActivityStore) => props.valueSelector(findSet(store)))
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
    positionsSelector: undefined,
    tribesSelector: undefined,
    tentsSelector: undefined,
}

EmpSelector.defaultProps = defaultProps
