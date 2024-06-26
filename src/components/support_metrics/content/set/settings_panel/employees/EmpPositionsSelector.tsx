import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changePositions, changePositionsInclude } from '../../../../../common/store/multiset_container/sets/actions/Employees'
import { fetchPositions, Position } from '../../../../network_resource_fetcher/employees/FetchPositions'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { positionsSelector, positionsSelectorName } from '../../../../../common/store/multiset_container/sets/selectors/Employees'
import { setDecomposition } from '../../../../../common/store/multiset_container/sets/Defaults'


export default function EmpPositionsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => positionsSelector(store, setTitle))
    const onValueChange = (allValues: Array<Position>, values: Array<string>) => changePositions({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changePositionsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, positionsSelectorName)

    return <MultiOptionSelector<Position, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select employees positions'
        label='Employees positions'
        fetchDataSource={fetchPositions}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
} 
