import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeVersions, changeVersionsInclude } from '../../../../store/actions/Tickets'
import { fetchVersions, Version } from '../../../../network_resource_fetcher/tickets/FetchVersions'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'


export default function VersionsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.versions)
    const onValueChange = (allValues: Array<Version>, values: Array<string>) => changeVersions({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeVersionsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Version, string>
        className='CustomersActivity_VersionsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select versions'
        label='Versions'
        fetchDataSource={fetchVersions}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
