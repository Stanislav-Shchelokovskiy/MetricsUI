import React from 'react'
import { useSelector } from 'react-redux'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeSeverity, changeSeverityInclude } from '../../../../store/actions/Bugs'
import { fetchSeverityValues, Severity } from '../../../../network_resource_fetcher/bugs/FetchSeverityValues'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import BugsSelectorWrapper from './BugsSelectors'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'


export default function SeveritySelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.severity)
    const onValueChange = (allValues: Array<Severity>, values: Array<string>) => changeSeverity({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeSeverityInclude({ stateId: setTitle, data: include })

    return <BugsSelectorWrapper
        Wrapped={MultiOptionSelector}
        setTitle={setTitle}
        className='CustomersActivity_SeveritySelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select severity values'
        label='Severity'
        fetchDataSource={fetchSeverityValues}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
    />
} 
