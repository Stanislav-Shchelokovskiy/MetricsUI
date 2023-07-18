import React from 'react'
import { useSelector } from 'react-redux'
import { Knot } from '../../../../common/Interfaces'
import { SupportMetricsStore } from '../../../store/Store'
import { fetchTribes } from '../../../../common/network_resource_fetcher/FetchTribes'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { changeTribes, changeTribesInclude } from '../../../store/actions/SetCommon'
import { useSetTitle } from '../../../../common/components/multiset_container/set/SetContext'
import { tribesSelector } from '../../../store/sets/Selectors'


export default function TribesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => tribesSelector(store, setTitle))
    const onValueChange = (allValues: Array<Knot>, selectedTribes: Array<string>) => changeTribes({ stateId: setTitle, data: selectedTribes })
    const onIncludeChange = (include: boolean) => changeTribesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Knot, string>
        className='TribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tribes to display...'
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
