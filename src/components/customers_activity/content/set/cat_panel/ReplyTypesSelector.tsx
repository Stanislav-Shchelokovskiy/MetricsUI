import React, {useMemo} from 'react'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { AppStore, useAppSelector } from '../../../../common/AppStore'
import { changeRepliesTypes, changeRepliesTypesInclude } from '../../../store/Actions'
import { fetchRepliesTypes, ReplyType } from '../../../network_resource_fetcher/FetchRepliesTypes'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function ReplyTypesSelector({ setTitle }: { setTitle: string }) {
    const empty = useMemo(()=>[],[])
    const state = useAppSelector((store: AppStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.repliesTypes as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<ReplyType>, values: Array<string>) => changeRepliesTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeRepliesTypesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelectorWithFetch<ReplyType, string>
        className='CustomersActivity_ReplyTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select replies type'
        label='CAT replies types'
        fetchDataSourceValues={fetchRepliesTypes}
        defaultValue={state.values}
        includeButtonState={state.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange} />
} 
