import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changePositions, changePositionsInclude } from '../../../store/Actions'
import { fetchPositions, Position } from '../../../network_resource_fetcher/FetchPositions'
import { FilterParametersNode } from '../../../store/SetsReducer'


export default function EmpPositionsSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.positions as FilterParametersNode<string>
    )

    const onValueChange = (allValues: Array<Position>, values: Array<string>) => changePositions({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changePositionsInclude({ stateId: setTitle, data: include })

    return <MultiOptionSelector<Position, string>
        className='CustomersActivity_PositionsSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select employees positions'
        label='Employees positions'
        fetchDataSource={fetchPositions}
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
    />
} 