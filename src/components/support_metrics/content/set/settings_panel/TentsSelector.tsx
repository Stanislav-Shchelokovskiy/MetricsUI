import React from 'react'
import { useSelector } from 'react-redux'
import { Knot } from '../../../../common/Interfaces'
import { SupportMetricsStore } from '../../../store/Store'
import { fetchTents } from '../../../../common/network_resource_fetcher/FetchTents'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { changeTents, changeTentsInclude } from '../../../store/actions/SetCommon'
import { useSetTitle } from '../../../../common/components/multiset_container/set/SetContext'
import { tentsSelector } from '../../../store/sets/Selectors'


export default function TentsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => tentsSelector(store, setTitle))
    const onValueChange = (allValues: Array<Knot>, values: Array<string>) => changeTents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTentsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Knot, string>
        className='TentsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tents to display...'
        label='Tents'
        fetchDataSource={fetchTents}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
}
