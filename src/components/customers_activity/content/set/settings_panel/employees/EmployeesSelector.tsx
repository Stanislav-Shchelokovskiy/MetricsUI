import React from 'react'
import { useSelector } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../../../common/Interfaces'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeEmployees, changeEmployeesInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmployees, Employee } from '../../../../network_resource_fetcher/employees/FetchEmployees'
import { FilterParametersNode } from '../../../../../common/store/multiset_container/sets/Interfaces'
import { paramOrDefault } from '../../../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { positionsSelector, empTribesSelector, empTentsSelector, employeesSelector } from '../../../../store/sets_reducer/Selectors'



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
    />
}


export interface EmpSelectorProps {
    className: string
    placeholder: string
    label: string
    valueSelector: (store: CustomersActivityStore, setTitle: string) => FilterParametersNode<string> | undefined
    changeSelection: (payload: Payload<string, Array<string>>) => PayloadAction<Payload<string, Array<string>>>
    changeInclude: (payload: Payload<string, boolean>) => PayloadAction<Payload<string, boolean>>
    positionsSelector: (store: CustomersActivityStore, setTitle: string) => FilterParametersNode<string> | undefined
    tribesSelector: (store: CustomersActivityStore, setTitle: string) => FilterParametersNode<string> | undefined
    tentsSelector: (store: CustomersActivityStore, setTitle: string) => FilterParametersNode<string> | undefined
}

export function EmpSelector(props: EmpSelectorProps) {
    const setTitle = useSetTitle()

    const positionsNode = useSelector((store: CustomersActivityStore) => props.positionsSelector(store, setTitle))
    const tribesNode = useSelector((store: CustomersActivityStore) => props.tribesSelector(store, setTitle))
    const tentsNode = useSelector((store: CustomersActivityStore) => props.tentsSelector(store, setTitle))
    const fetchArgs = [paramOrDefault(positionsNode), paramOrDefault(tribesNode), paramOrDefault(tentsNode)]

    const value = useSelector((store: CustomersActivityStore) => props.valueSelector(store, setTitle))
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
    positionsSelector: (store: CustomersActivityStore, setTitle: string) => undefined,
    tribesSelector: (store: CustomersActivityStore, setTitle: string) => undefined,
    tentsSelector: (store: CustomersActivityStore, setTitle: string) => undefined,
}
EmpSelector.defaultProps = defaultProps
