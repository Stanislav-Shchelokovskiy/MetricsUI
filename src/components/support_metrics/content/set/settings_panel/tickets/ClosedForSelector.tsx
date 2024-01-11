import React, { useCallback } from 'react'
import NumericSelector from '../../../../../common/components/NumericSelector'
import { useSelector } from 'react-redux'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeClosedFor } from '../../../../store/actions/Tickets'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { closedForSelector } from '../../../../store/sets/Selectors'
import { isTicketLifetimeSelector } from '../../../../../common/store/multiset_container/Selectors'


export default function ClosedForSelector() {
    const setTitle = useSetTitle()
    const value = useSelector((store: SupportMetricsStore) => closedForSelector(store, setTitle)?.value)
    const onValueChange = (value: number | undefined) => changeClosedFor({ stateId: setTitle, data: value ? value : undefined })
    const format = useCallback((value: number | undefined) => {
        return value ? `${Math.round(value)} day(s) or more` : ''
    }, [])

    const ticketLifetimeSelected = useSelector((store: SupportMetricsStore) => isTicketLifetimeSelector(store))
    if (ticketLifetimeSelected)
        return null

    return <NumericSelector
        className='OptionSelector'
        min={0}
        defaultValue={0}
        format={format}
        currentValue={value}
        onValueChange={onValueChange}
        placeholder='Any number of days'
        label='Ticket closed for'
        spinDelay={700}
        disabled={ticketLifetimeSelected}
    />
}
