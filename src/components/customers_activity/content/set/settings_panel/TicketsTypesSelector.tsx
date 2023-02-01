import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MultiOptionSelector from '../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../store/Store'
import { changeTicketsTypes, changeTicketsTypesInclude, changeIncludeDuplicates } from '../../../store/Actions'
import { fetchTicketsTypes, TicketsType } from '../../../network_resource_fetcher/FetchTicketsTypes'
import { FilterParametersNode } from '../../../store/SetsReducer'
import { getIncludeButtonOptions } from '../../../../common/components/Button'


export default function TicketsTypesSelector({ setTitle }: { setTitle: string }) {
    const value = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTypes as FilterParametersNode<number>
    )

    const referredTicketsTypes = useSelector((store: CustomersActivityStore) =>
        store.customersActivitySets.find(x => x.title === setTitle)?.referredTicketsTypes
    )

    const onValueChange = (allValues: Array<TicketsType>, values: Array<number>) => changeTicketsTypes({ stateId: setTitle, data: values })
    const onIncludeChange = (include: boolean) => changeTicketsTypesInclude({ stateId: setTitle, data: include })

    const dispatch = useDispatch()
    const onIncludeDuplicatesChange = (include: boolean) => dispatch(changeIncludeDuplicates({ stateId: setTitle, data: include }))

    const customButtons = useMemo(() => [getIncludeButtonOptions(
        'includeDuplicates',
        'after',
        referredTicketsTypes !== undefined,
        'selectall',
        'selectall',
        onIncludeDuplicatesChange,
        '',
        '',
        'success',
        'normal'
    )], [referredTicketsTypes])

    return <MultiOptionSelector<TicketsType, number>
        className='CustomersActivity_TicketsTypesSelector'
        displayExpr='name'
        valueExpr='id'
        placeholder='Select ticket types'
        label='Ticket types'
        fetchDataSource={fetchTicketsTypes}
        value={value.values}
        includeButtonState={value.include}
        onValueChange={onValueChange}
        onIncludeChange={onIncludeChange}
        container='#CustomersActivity_Sets_ScrollView_div'
        customButtons={customButtons}
    />
} 
