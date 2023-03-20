import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeEmployees, changeEmployeesInclude } from '../../../../store/actions/Employees'
import { fetchEmployees, Employee } from '../../../../network_resource_fetcher/employees/FetchEmployees'
import { FilterParametersNode, getDefaultFilterParametersNode } from '../../../../store/SetsReducer'


export default function EmployeesSelector({ setTitle }: { setTitle: string }) {
    const param_or_default = useCallback((param: FilterParametersNode<string> | undefined) => {
        return param || ((getDefaultFilterParametersNode<string>([]) as unknown) as Array<string>)
    }, [])

    const positionsNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.positions)
    const tribesNode = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.empTribes)
    const fetchArgs = [param_or_default(positionsNode), param_or_default(tribesNode)]

    const value = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.employees)
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
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}
