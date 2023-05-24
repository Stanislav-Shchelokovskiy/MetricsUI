import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { CostMetricsStore } from '../../store/Store'
import { changePositions, changePositionsInclude } from '../../../common/store/set_container/sets/actions/Employees'
import { fetchPositions, Position } from '../../network_resource_fetcher/Positions'


export default function EmpPositionsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CostMetricsStore) => store.sets.find(x => x.title === setTitle)?.empPositions)
    const onValueChange = (allValues: Array<Position>, values: Array<string>) => changePositions({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changePositionsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Position, string>
        className='CostMetrics_PositionsSelector'
        displayExpr='name'
        valueExpr='name'
        placeholder='Select employees positions'
        label='Employees positions'
        fetchDataSource={fetchPositions}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
