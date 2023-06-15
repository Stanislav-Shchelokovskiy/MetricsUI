import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeFrameworks, changeFrameworksInclude } from '../../../../store/actions/Tickets'
import { FetchFrameworks, Framework } from '../../../../network_resource_fetcher/tickets/FetchFrameworks'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { frameworksSelector } from '../../../../store/sets/Selectors'


export default function FrameworksSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => frameworksSelector(store, setTitle))
    const onValueChange = (allValues: Array<Framework>, values: Array<string>) => changeFrameworks({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeFrameworksInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Framework, string>
        className='CustomersActivity_FrameworksSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select frameworks'
        label='Frameworks/Specifics'
        fetchDataSource={FetchFrameworks}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
