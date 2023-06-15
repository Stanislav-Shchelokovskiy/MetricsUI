import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeIDEs, changeIDEsInclude } from '../../../../store/actions/Tickets'
import { fetchIDEs, IDE } from '../../../../network_resource_fetcher/tickets/FetchIDEs'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { idesSelector } from '../../../../store/sets_reducer/Selectors'


export default function IDEsSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => idesSelector(store, setTitle))
    const onValueChange = (allValues: Array<IDE>, values: Array<string>) => changeIDEs({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeIDEsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<IDE, string>
        className='CustomersActivity_IDEsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select IDEs'
        label='IDE'
        fetchDataSource={fetchIDEs}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
} 
