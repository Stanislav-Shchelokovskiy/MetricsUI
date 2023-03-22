import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { CustomersActivityStore } from '../../../../store/Store'
import { nodeIsEmpty } from '../../../../store/Utils'


export default function BugsSelectorWrapper<DataSourceT, ValueExprT>({ Wrapped, setTitle, ...props }: { Wrapped: FC<any>, setTitle: string } & any) {
    const ticketTypes = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTypes)
    if (nodeIsEmpty(ticketTypes, 2))
        return null
    return <Wrapped
        {...props}
        setTitle={setTitle}
        hideIfDataSourceEmpty={true}
    />
}
