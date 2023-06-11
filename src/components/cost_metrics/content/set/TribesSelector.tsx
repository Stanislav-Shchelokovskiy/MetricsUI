import React from 'react'
import { useSelector } from 'react-redux'
import { CostMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeEmpTribes, changeEmpTribesInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetchTribes, Tribe } from '../../network_resource_fetcher/Tribes'
import { empTribesSelector } from '../../store/sets/Selectors'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'


export default function EmpTribesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: CostMetricsStore) => empTribesSelector(state, setTitle))
    const onValueChange = (allValues: Array<Tribe>, values: Array<string>) => changeEmpTribes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTribesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Tribe, string>
        className='CostMetrics_EmpTribesSelector'
        displayExpr='name'
        valueExpr='name'
        placeholder='Select employees tribes'
        label='Tribes'
        fetchDataSource={fetchTribes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
