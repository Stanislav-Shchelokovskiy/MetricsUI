import React from 'react'
import { useSelector } from 'react-redux'
import { CostMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changePositions, changePositionsInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetchPositions, Position } from '../../network_resource_fetcher/Positions'
import { empPositionsSelector } from '../../store/sets/Selectors'

export default function EmpPositionsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((state: CostMetricsStore) => empPositionsSelector(state, setTitle))

    const onValueChange = (allValues: Array<Position>, values: Array<string>) => changePositions({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changePositionsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Position, string>
        className='CostMetrics_PositionsSelector'
        displayExpr='name'
        valueExpr='name'
        placeholder='Select employees positions'
        label='Positions'
        fetchDataSource={fetchPositions}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
