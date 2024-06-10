import React from 'react'
import { useSelector } from 'react-redux'
import { Knot } from '../../../../common/Typing'
import { SupportMetricsStore } from '../../../store/Store'
import { fetchTribes } from '../../../network_resource_fetcher/Tribes'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { changeTribes, changeTribesInclude } from '../../../../common/store/multiset_container/sets/actions/Common'
import { useSetTitle } from '../../../../common/components/multiset_container/set/SetContext'
import { tribesSelector, tribesSelectorName } from '../../../../common/store/multiset_container/sets/selectors/Common'
import { setDecomposition } from '../../../../common/store/multiset_container/sets/Defaults'


export default function TribesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => tribesSelector(store, setTitle))
    const onValueChange = (allValues: Array<Knot>, selectedTribes: Array<string>) => changeTribes({ stateId: setTitle, data: selectedTribes })
    const onIncludeChange = (include: boolean) => changeTribesInclude({ stateId: setTitle, data: include })
    const decompositionArgs = setDecomposition(setTitle, tribesSelectorName)

    return <MultiOptionSelector<Knot, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select tribes to display...'
        label='Tribes'
        fetchDataSource={fetchTribes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
        decompositionArgs={decompositionArgs}
    />
}
