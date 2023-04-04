import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeIDEs, changeIDEsInclude } from '../../../../store/actions/Tickets'
import { fetchIDEs, IDE } from '../../../../network_resource_fetcher/tickets/FetchIDEs'


export default function IDEsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ides)
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
        container='#CustomersActivity_Sets_ScrollView_div'
        showNullItem={true}
    />
} 
