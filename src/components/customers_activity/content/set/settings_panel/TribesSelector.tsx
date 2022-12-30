import React from 'react'
import { useSelector } from 'react-redux'
import { Tribe } from '../../../../common/Interfaces'
import { CustomersActivityStore } from '../../../store/Store'
import { fetchTribes } from '../../../../common/network_resource_fetcher/FetchAvailableTribes'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { FilterParametersNode } from '../../../store/SetsReducer'
import { changeTribes, changeTribesInclude } from '../../../store/Actions'


export default function TribesSelector({ setTitle }: { setTitle: string }) {
    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.tribes as FilterParametersNode<string>
    )
    const onValueChange = (allValues: Array<Tribe>, selectedTribes: Array<string>) => changeTribes({ stateId: setTitle, data: selectedTribes })
    const onIncludeChange = (include: boolean) => changeTribesInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Tribe, string>
        className='TribesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select tribes to display...'
        label='Tribes'
        fetchDataSource={fetchTribes}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
}
