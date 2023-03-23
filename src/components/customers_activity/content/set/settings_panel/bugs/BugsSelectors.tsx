import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { CustomersActivityStore } from '../../../../store/Store'
import { nodeIsEmpty } from '../../../../store/Utils'

interface BugSelectorProps {
    Wrapped: FC<any>
    setTitle: string
}

export default function BugsSelectorWrapper({ Wrapped, setTitle, ...wrappedProps }: BugSelectorProps & any) {
    const ticketTypes = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTypes)
    if (nodeIsEmpty(ticketTypes, 2))
        return null
    return <Wrapped
        {...wrappedProps}
        setTitle={setTitle}
        hideIfDataSourceEmpty={true}
    />
}

export function ClosedBugsSelectorWrapper({ Wrapped, setTitle, ...wrappedProps }: BugSelectorProps & any) {
    const ticketStatuses = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ticketStatuses)
    if (nodeIsEmpty(ticketStatuses, 'Closed'))
        return null
    return <BugsSelectorWrapper Wrapped={Wrapped} setTitle={setTitle} {...wrappedProps} />
}
