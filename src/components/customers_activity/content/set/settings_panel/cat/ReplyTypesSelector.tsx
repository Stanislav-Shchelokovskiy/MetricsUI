import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeRepliesTypes, changeRepliesTypesInclude } from '../../../../store/actions/CAT'
import { fetchRepliesTypes, ReplyType } from '../../../../network_resource_fetcher/cat/FetchRepliesTypes'


export default function ReplyTypesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>store.customersActivitySets.find(x => x.title === setTitle)?.repliesTypes)
    const onValueChange = (allValues: Array<ReplyType>, values: Array<string>) => changeRepliesTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeRepliesTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<ReplyType, string>
        className='CustomersActivity_ReplyTypesSelector'
        displayExpr='name'
        valueExpr='id'
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
