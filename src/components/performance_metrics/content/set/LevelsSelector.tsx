import React from 'react'
import { useSelector } from 'react-redux'
import { PerformanceMetricsStore } from '../../store/Store'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeLevels, changeLevelsInclude } from '../../../common/store/multiset_container/sets/actions/Employees'
import { fetcLevels } from '../../network_resource_fetcher/Levels'
import { levelsSelector } from '../../../common/store/multiset_container/sets/selectors/Employees'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { Knot } from '../../../common/Typing'
import { SupportsNullFilter } from '../../../common/Typing'

export default function LevelsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((state: PerformanceMetricsStore) => levelsSelector(state, setTitle))
    const onValueChange = (allValues: Array<Knot>, values: Array<SupportsNullFilter<number>>) => changeLevels({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeLevelsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Knot, number | SupportsNullFilter<number>>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select employees levels'
        label='Levels'
        fetchDataSource={fetcLevels}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
