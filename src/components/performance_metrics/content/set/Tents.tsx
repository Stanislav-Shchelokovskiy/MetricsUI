import React from 'react'
import { useSelector } from 'react-redux'
import { Knot } from '../../../common/Typing'
import { PerformanceMetricsStore } from '../../store/Store'
import { fetchTents } from '../../network_resource_fetcher/Tents'
import MultiOptionSelector from '../../../common/components/MultiOptionSelector'
import { changeTents, changeTentsInclude } from '../../../common/store/multiset_container/sets/actions/Common'
import { useSetTitle } from '../../../common/components/multiset_container/set/SetContext'
import { tentsSelector, tentsSelectorName } from '../../../common/store/multiset_container/sets/selectors/Common'
import { setDecomposition } from '../../../common/store/multiset_container/sets/Defaults'


export default function TentsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: PerformanceMetricsStore) => tentsSelector(store, setTitle))
    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changeTents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTentsInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, tentsSelectorName)

    return <MultiOptionSelector<Knot, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select tents to display...'
        label='Tents'
        fetchDataSource={fetchTents}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
}
