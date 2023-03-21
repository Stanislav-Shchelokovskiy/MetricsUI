import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'
import { nodeIsEmpty } from '../../../../store/Utils'


export default function BugsSelector<DataSourceT, ValueExprT>(params: any) {
    const ticketTypes = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === params.setTitle)?.ticketsTypes)
    if (nodeIsEmpty(ticketTypes, 2))
        return null
    return <MultiOptionSelector<DataSourceT, ValueExprT>
        {...params}
        hideIfDataSourceEmpty={true}
    />
} 
