import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../../../common/Interfaces'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeEmployees, changeEmployeesInclude } from '../../../../store/actions/Employees'
import { fetchEmployees, Employee } from '../../../../network_resource_fetcher/employees/FetchEmployees'
import { FilterParametersNode, getDefaultFilterParametersNode, Set } from '../../../../store/SetsReducer'

interface EmpSelectorProps {
    setTitle: string
    className: string
    placeholder: string
    label: string
    valueSelector: (x: Set | undefined) => FilterParametersNode<string> | undefined
    changeSelection: (payload: Payload<string, Array<string>>) => PayloadAction<Payload<string, Array<string>>>
    changeInclude: (payload: Payload<string, boolean>)=> PayloadAction<Payload<string, boolean>>
}


export default function EmployeesSelector({ setTitle }: { setTitle: string }) {
    const valueSelector = useCallback((x: Set | undefined) => x?.employees, [])
    return <EmpSelector
        setTitle={setTitle}
        className='CustomersActivity_EmployeesSelector'
        placeholder='Select employees'
        label='Employees'
        valueSelector={valueSelector}
        changeSelection={changeEmployees}
        changeInclude={changeEmployeesInclude}
    />
}

export function EmpSelector(props: EmpSelectorProps) {
    const paramOrDefault = useCallback((param: FilterParametersNode<string> | undefined) => {
        return param || ((getDefaultFilterParametersNode<string>([]) as unknown) as Array<string>)
    }, [])

    const setTitle = props.setTitle
    const positionsNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.positions)
    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.empTribes)
    const fetchArgs = [paramOrDefault(positionsNode), paramOrDefault(tribesNode)]

    const value = useSelector((store: CustomersActivityStore) => props.valueSelector(store.customersActivitySets.find(x => x.title === setTitle)))
    const onValueChange = (allValues: Array<Employee>, values: Array<string>) => props.changeSelection({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => props.changeInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Employee, string>
        className={props.className}
        displayExpr='name'
        valueExpr='crmid'
        placeholder={props.placeholder}
        label={props.label}
        fetchDataSource={fetchEmployees}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}
