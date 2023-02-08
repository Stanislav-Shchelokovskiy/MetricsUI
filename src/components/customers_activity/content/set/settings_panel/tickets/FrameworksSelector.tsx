import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { changeFrameworks, changeFrameworksInclude } from '../../../../store/actions/Tickets'
import { FetchFrameworks, Framework } from '../../../../network_resource_fetcher/FetchFrameworks'


export default function FrameworksSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.frameworks)
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
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
