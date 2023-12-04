import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeOperatingSystems, changeOperatingSystemsInclude } from '../../../../store/actions/Tickets'
import { fetchOperatingSystems, OS } from '../../../../network_resource_fetcher/tickets/FetchOperatingSystems'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { operatingSystemsSelector } from '../../../../store/sets/Selectors'


export default function OsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => operatingSystemsSelector(store, setTitle))
    const onValueChange = (allValues: Array<OS>, values: Array<string>) => changeOperatingSystems({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeOperatingSystemsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<OS, string>
        displaySelector='name'
        valueSelector='id'
        placeholder='Select operating systems'
        label='Operating system'
        fetchDataSource={fetchOperatingSystems}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
