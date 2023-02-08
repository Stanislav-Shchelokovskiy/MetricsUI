import React from 'react'
import { useSelector } from 'react-redux'
import MultiOptionSelector from '../../../../../common/components/MultiOptionSelector'
import { CustomersActivityStore } from '../../../../store/Store'


export default function BugsSelector<DataSourceT, ValueExprT>(params: any) {
    const ticketTypes = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === params.setTitle)?.ticketsTypes)
    const fetchArgs = [ticketTypes]
    return <MultiOptionSelector<DataSourceT, ValueExprT>
        {...params}
        fetchArgs={fetchArgs}
        hideIfDataSourceEmpty={true}
    />
} 
