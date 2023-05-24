import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { CostMetricsStore } from '../../store/Store'
import { changeEmpTribes, changeEmpTribesInclude } from '../../../common/store/set_container/sets/actions/Employees'
import { fetchTribes, Tribe } from '../../network_resource_fetcher/Tribes'


export default function EmpTribesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CostMetricsStore) => store.sets.find(x => x.title === setTitle)?.empTribes)
    const onValueChange = (allValues: Array<Tribe>, values: Array<string>) => changeEmpTribes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeEmpTribesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Tribe, string>
        className='CostMetrics_EmpTribesSelector'
        displayExpr='name'
        valueExpr='name'
        placeholder='Select employees tribes'
        label='Employees tribes'
        fetchDataSource={fetchTribes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
