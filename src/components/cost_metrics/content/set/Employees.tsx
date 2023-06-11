import React from 'react'
import { useSelector } from 'react-redux'
import { CostMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeEmployees, changeEmployeesInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmployees, Employee } from '../../network_resource_fetcher/Employees'
import { empTribesSelector, empPositionsSelector, employeesSelector } from '../../store/sets/Selectors'
import { paramOrDefault } from '../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'

export default function EmployeesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: CostMetricsStore) => employeesSelector(state, setTitle))
    const tribes = useSelector((state: CostMetricsStore) => empTribesSelector(state, setTitle))
    const positions = useSelector((state: CostMetricsStore) => empPositionsSelector(state, setTitle))
    const fetchArgs = [paramOrDefault(tribes), paramOrDefault(positions)]

    const onValueChange = (allValues: Array<Employee>, values: Array<string>) => changeEmployees({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmployeesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Employee, string>
        className='CostMetrics_EmployeesSelector'
        placeholder='Select employees'
        label='Employees'
        displayExpr='name'
        valueExpr='name'
        fetchDataSource={fetchEmployees}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={false}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
}
