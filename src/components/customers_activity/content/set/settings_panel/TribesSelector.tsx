import React from 'react'
import { useSelector } from 'react-redux'
import { Tribe } from '../../../../common/Interfaces'
import { CustomersActivityStore } from '../../../store/Store'
import { fetchTribes } from '../../../../common/network_resource_fetcher/FetchAvailableTribes'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { changeTribes, changeTribesInclude } from '../../../store/actions/SetCommon'


export default function TribesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>store.customersActivitySets.find(x => x.title === setTitle)?.tribes)
    const onValueChange = (allValues: Array<Tribe>, selectedTribes: Array<string>) => changeTribes({ stateId: setTitle, data: selectedTribes })
    const onIncludeChange = (include: boolean) => changeTribesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Tribe, string>
        className='TribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tribes to display...'
        label='Tribes'
        fetchDataSource={fetchTribes}
        value={value?.values}
        includeButtonState={value === undefined || value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
        showNullItem={true}
    />
}
