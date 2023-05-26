import React from 'react'
import { useSelector } from 'react-redux'
import { Tribe } from '../../../../common/Interfaces'
import { CustomersActivityStore } from '../../../store/Store'
import { fetchTents } from '../../../../common/network_resource_fetcher/FetchTents'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { changeTents, changeTentsInclude } from '../../../store/actions/SetCommon'


export default function TentsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) => store.sets.find(x => x.title === setTitle)?.tents)
    const onValueChange = (allValues: Array<Tribe>, values: Array<string>) => changeTents({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTentsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Tribe, string>
        className='TentsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tents to display...'
        label='Tents'
        fetchDataSource={fetchTents}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#Sets_ScrollView_div'
        showNullItem={true}
    />
}
