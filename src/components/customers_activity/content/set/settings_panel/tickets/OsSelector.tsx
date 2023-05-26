import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeOperatingSystems, changeOperatingSystemsInclude } from '../../../../store/actions/Tickets'
import { fetchOperatingSystems, OS } from '../../../../network_resource_fetcher/tickets/FetchOperatingSystems'


export default function OsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.operatingSystems)
    const onValueChange = (allValues: Array<OS>, values: Array<string>) => changeOperatingSystems({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeOperatingSystemsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<OS, string>
        className='CustomersActivity_OsSelector'
        displayExpr='name'
        valueExpr='id'
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
