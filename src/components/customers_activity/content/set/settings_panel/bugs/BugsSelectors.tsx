import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { CustomersActivityStore } from '../../../../store/Store'
import { closedIsNotSelected, bugIsNotSelected } from '../../../../store/Utils'

interface BugSelectorProps {
    Wrapped: FC<any>
    setTitle: string
}

export default function BugsSelectorWrapper({ Wrapped, setTitle, ...wrappedProps }: BugSelectorProps & any) {
    const ticketTypes = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ticketsTypes)
    if (bugIsNotSelected(ticketTypes))
        return null
    return <Wrapped
        {...wrappedProps}
        setTitle={setTitle}
        hideIfDataSourceEmpty={true}
        showNullItem={true}
    />
}

export function ClosedBugsSelectorWrapper({ Wrapped, setTitle, ...wrappedProps }: BugSelectorProps & any) {
    const ticketStatuses = useSelector((store: CustomersActivityStore) => store.customersActivitySets.find(x => x.title === setTitle)?.ticketStatuses)
    if (closedIsNotSelected(ticketStatuses))
        return null
    return <BugsSelectorWrapper Wrapped={Wrapped} setTitle={setTitle} {...wrappedProps} />
}
