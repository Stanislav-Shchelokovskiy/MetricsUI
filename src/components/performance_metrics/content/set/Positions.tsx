import React from 'react'
import { useSelector } from 'react-redux'
import { PerformanceMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changePositions, changePositionsInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetchPositions } from '../../network_resource_fetcher/Positions'
import { positionsSelector } from '../../store/sets/Selectors'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { Knot } from '../../../common/Interfaces'

export default function PositionsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: PerformanceMetricsStore) => positionsSelector(state, setTitle))
    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changePositions({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changePositionsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Knot, string>
        className='PositionsSelector'
        displayExpr='name'
        valueExpr='id'
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
