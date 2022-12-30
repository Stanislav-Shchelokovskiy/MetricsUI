import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeEmployees, changeEmployeesInclude } from '../../../store/Actions'
import { fetchEmployees, Employee } from '../../../network_resource_fetcher/FetchEmployees'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function EmployeesSelector({ setTitle }: { setTitle: string }) {
    const positionsNode = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.positions as FilterParametersNode<string>
    )
    const tribesNode = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.empTribes as FilterParametersNode<string>
    )
    const fetchArgs = [positionsNode, tribesNode]

    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.employees as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<Employee>, values: Array<string>) => changeEmployees({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmployeesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Employee, string>
        className='CustomersActivity_EmployeesSelector'
        displayExpr='name'
        valueExpr='crmid'
        placeholder='Select employees'
        label='Employees'
        fetchDataSource={fetchEmployees}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}
