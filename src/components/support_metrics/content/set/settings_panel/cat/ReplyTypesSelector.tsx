import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeRepliesTypes, changeRepliesTypesInclude } from '../../../../store/actions/CAT'
import { fetchRepliesTypes, ReplyType } from '../../../../network_resource_fetcher/cat/FetchRepliesTypes'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { repliesTypesSelector } from '../../../../store/sets/Selectors'


export default function ReplyTypesSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => repliesTypesSelector(store, setTitle))
    const onValueChange = (allValues: Array<ReplyType>, values: Array<string>) => changeRepliesTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeRepliesTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<ReplyType, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select replies type'
        label='CAT replies types'
        fetchDataSource={fetchRepliesTypes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
