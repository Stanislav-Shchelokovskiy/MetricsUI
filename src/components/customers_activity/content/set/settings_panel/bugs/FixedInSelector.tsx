import React from 'react'
import { useSelector } from 'react-redux'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeFixedIn, changeFixedInInclude } from '../../../../store/actions/Bugs'
import { Version } from '../../../../network_resource_fetcher/tickets/FetchVersions'
import { fetchFixedInVersions } from '../../../../network_resource_fetcher/bugs/FetchFixedInVersions'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'


export default function FixedInSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.fixedIn)
    const onValueChange = (allValues: Array<Version>, values: Array<string>) => changeFixedIn({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeFixedInInclude({ stateId: setTitle, data: include })

    return <BugsSelectorWrapper
        Wrapped={MultiOptionSelector}
        setTitle={setTitle}
        className='CustomersActivity_FixedInSelector'
        displayExpr='id'
        valueExpr='id'
        placeholder='Select versions'
        label='Fixed In'
        fetchDataSource={fetchFixedInVersions}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
    />
} 
