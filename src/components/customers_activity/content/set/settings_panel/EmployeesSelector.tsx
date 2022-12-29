import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MultiOptionSelector } from '../../../../common/components/MultiOptionSelector'
import { anyDependencyIsEmpty } from '../../../../common/components/Utils'
import { CustomersActivityStore } from '../../../store/Store'
import { changeEmployees, changeEmployeesInclude } from '../../../store/Actions'
import { getFilterParametersNodeValuesOrDefault } from '../../../store/Utils'
import { fetchEmployees, Employee } from '../../../network_resource_fetcher/FetchEmployees'
import { useCascadeDataSource } from '../../../../common/hooks/UseDataSource'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function EmployeesSelector({ setTitle }: { setTitle: string }) {
    const emptyArray = useMemo(() => [], [])

    const positionsNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.positions)
    const positions =  getFilterParametersNodeValuesOrDefault(positionsNode, emptyArray)

    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.empTribes)
    const tribes = getFilterParametersNodeValuesOrDefault(tribesNode, emptyArray)
    
    const dataSource = useCascadeDataSource(() => fetchEmployees(positions, tribes), positions, tribes)

    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.employees as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<Employee>, values: Array<string>) => changeEmployees({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmployeesInclude({ stateId: setTitle, data: include })

    if (anyDependencyIsEmpty(dataSource))
        return null
    return <MultiOptionSelector<Employee, string>
        className='CustomersActivity_EmployeesSelector'
        displayExpr='name'
        valueExpr='crmid'
        placeholder='Select employees'
        label='Employees'
        dataSource={dataSource}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
