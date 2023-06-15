import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { SupportMetricsStore } from '../../../../store/Store'
import { closedIsNotSelected, bugIsNotSelected } from '../../../../store/Utils'
import { ticketsTypesSelector, ticketStatusesSelector } from '../../../../store/sets/Selectors'

interface BugSelectorProps {
    Wrapped: FC<any>
    setTitle: string
}

export default function BugsSelectorWrapper({ Wrapped, setTitle, ...wrappedProps }: BugSelectorProps & any) {
    const ticketTypes = useSelector((store: SupportMetricsStore) => ticketsTypesSelector(store, setTitle))
    if (bugIsNotSelected(ticketTypes))
        return null
    return <Wrapped
        {...wrappedProps}
        setTitle={setTitle}
        hideIfDataSourceEmpty={true}
        showNullItem={true}
        container='#Sets_ScrollView_div'
    />
}

export function ClosedBugsSelectorWrapper({ Wrapped, setTitle, ...wrappedProps }: BugSelectorProps & any) {
    const ticketStatuses = useSelector((store: SupportMetricsStore) => ticketStatusesSelector(store, setTitle))
    if (closedIsNotSelected(ticketStatuses))
        return null
    return <BugsSelectorWrapper Wrapped={Wrapped} setTitle={setTitle} {...wrappedProps} />
}
