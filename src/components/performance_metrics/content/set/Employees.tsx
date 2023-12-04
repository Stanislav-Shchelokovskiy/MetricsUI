import React from 'react'
import { useSelector } from 'react-redux'
import { PerformanceMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeEmployees, changeEmployeesInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetchEmployees } from '../../network_resource_fetcher/Employees'
import { paramOrDefault } from '../../../common/store/multiset_container/Utils'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { Knot } from '../../../common/Typing'
import {
    empTentsSelector,
    positionsSelector,
    levelsSelector,
    employeesSelector,
} from '../../../common/store/multiset_container/sets/selectors/Employees'
import { decomposeSet, Decomposition } from '../../../common/store/multiset_container/Actions'
import { nameOf } from '../../../common/store/multiset_container/sets/Interfaces'

export default function EmployeesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: PerformanceMetricsStore) => employeesSelector(state, setTitle))

    const tents = useSelector((state: PerformanceMetricsStore) => empTentsSelector(state, setTitle))
    const positions = useSelector((state: PerformanceMetricsStore) => positionsSelector(state, setTitle))
    const levels = useSelector((state: PerformanceMetricsStore) => levelsSelector(state, setTitle))

    const fetchArgs = [paramOrDefault(tents), paramOrDefault(positions), paramOrDefault(levels)]

    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changeEmployees({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmployeesInclude({ stateId: setTitle, data: include })
    const onDecomposition = (values: Array<Knot>, displaySelector: string, valueSelector: string) => {
        const decomposition: Decomposition = {
            sourceSet: setTitle,
            propertyName: nameOf('employees'),
            values: values,
            displaySelector: displaySelector,
            valueSelector: valueSelector,
        }
        return decomposeSet(decomposition)
    }

    return <MultiOptionSelector<Knot, string>
        placeholder='Select employees'
        label='Employees'
        displayExpr='name'
        valueExpr='id'
        fetchDataSource={fetchEmployees}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        onDecomposition={onDecomposition}
    />
}
