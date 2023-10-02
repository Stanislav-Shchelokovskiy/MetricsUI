import React from 'react'
import { useSelector } from 'react-redux'
import { Knot } from '../../../common/Typing'
import { PerformanceMetricsStore } from '../../store/Store'
import { fetchTents } from '../../network_resource_fetcher/Tents'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeEmpTents, changeEmpTentsInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { empTentsSelector } from '../../../common/store/multiset_container/sets/selectors/Employees'


export default function EmpTentsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: PerformanceMetricsStore) => empTentsSelector(store, setTitle))
    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changeEmpTents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTentsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Knot, string>
        className='EmpTentsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tents to display...'
        label='Employee Tents'
        fetchDataSource={fetchTents}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
}
