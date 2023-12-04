import React from 'react'
import { useSelector } from 'react-redux'
import { CostMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeEmployees, changeEmployeesInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmployees } from '../../network_resource_fetcher/Employees'
import { paramOrDefault } from '../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { Knot } from '../../../common/Typing'
import { empTeamsSelector } from '../../store/sets/Selectors'
import {
    empTribesSelector,
    empTentsSelector,
    positionsSelector,
    employeesSelector
} from '../../../common/store/multiset_container/sets/selectors/Employees'

export default function EmployeesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: CostMetricsStore) => employeesSelector(state, setTitle))

    const teams = useSelector((state: CostMetricsStore) => empTeamsSelector(state, setTitle))
    const tribes = useSelector((state: CostMetricsStore) => empTribesSelector(state, setTitle))
    const tents = useSelector((state: CostMetricsStore) => empTentsSelector(state, setTitle))
    const positions = useSelector((state: CostMetricsStore) => positionsSelector(state, setTitle))
    const fetchArgs = [paramOrDefault(teams), paramOrDefault(tribes), paramOrDefault(tents), paramOrDefault(positions)]

    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changeEmployees({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmployeesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Knot, string>
        className='CostMetrics_EmployeesSelector'
        placeholder='Select employees'
        label='Employees'
        displaySelector='name'
        valueSelector='id'
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
