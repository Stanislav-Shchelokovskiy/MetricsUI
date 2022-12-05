import React from 'react'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { AppStore } from '../../../../common/AppStore'
import { changeRepliesTypes } from '../../../store/Actions'
import { fetchRepliesTypes, ReplyType } from '../../../network_resource_fetcher/FetchRepliesTypes'


export default function ReplyTypesSelector({ setTitle }: { setTitle: string }) {
    const stateSelector = (store: AppStore) => store.customersActivitySets.find(x => x.title === setTitle)?.repliesTypes || []
    const onValueChange = (allValues: Array<ReplyType>, values: Array<number>) => changeRepliesTypes({ stateId: setTitle, data: values })

    return <MultiOptionSelector<ReplyType, number>
        className='CustomersActivity_ReplyTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select replies type'
        label='CAT replies types'
        fetchDataSourceValues={fetchRepliesTypes}
        stateSelector={stateSelector}
        onValueChange={onValueChange} />
} 
