import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelectorWithFetch from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changePositions, changePositionsInclude } from '../../../store/Actions'
import { fetchPositions, Position } from '../../../network_resource_fetcher/FetchPositions'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function PositionsSelector({ setTitle }: { setTitle: string }) {
    const state = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.positions as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Position>, values: Array<string>) => changePositions({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changePositionsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelectorWithFetch<Position, string>
        className='CustomersActivity_PositionsSelector'
        displayExpr='pos_name'
        valueExpr='pos_id'
        placeholder='Select employee positions'
        label='Employee positions'
        fetchDataSourceValues={fetchPositions}
        value={state?.values}
        includeButtonState={state?.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 
