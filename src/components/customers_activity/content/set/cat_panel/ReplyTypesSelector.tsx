import React from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { AppStore } from '../../../../common/AppStore'
import { changeRepliesTypes } from '../../../store/Actions'
import { fetchRepliesTypes, ReplyType } from '../../../network_resource_fetcher/FetchRepliesTypes'


export default function ReplyTypesSelector({ setTitle }: { setTitle: string }) {
    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.repliesTypes || []
    const onValueChange = (allValues: Array<ReplyType>, values: Array<string>) => changeRepliesTypes({ stateId: setTitle, data: values })

    return <MultiOptionSelectorWithFetch<ReplyType, string>
        className='CustomersActivity_ReplyTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select replies type'
        label='CAT replies types'
        fetchDataSourceValues={fetchRepliesTypes}
        stateSelector={stateSelector}
        onValueChange={onValueChange} />
} 
