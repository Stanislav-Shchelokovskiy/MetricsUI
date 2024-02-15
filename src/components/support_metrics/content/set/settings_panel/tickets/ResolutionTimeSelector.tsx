import React, { useEffect, useRef, useState } from 'react'
import { NumberBox } from 'devextreme-react/number-box'
import { useSelector, useDispatch } from 'react-redux'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeResolutionTime } from '../../../../store/actions/Tickets'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { resolutionTimeSelector } from '../../../../store/sets/Selectors'
import Button, { getClearButtonOptions } from '../../../../../common/components/Button'
import { isTicketResolutionTimeSelector } from '../../../../../common/store/multiset_container/Selectors'


export default function ResolutionTimeSelector() {
    const setTitle = useSetTitle()
    const emptyRange = [0, 0]
    const appliedRange = useSelector((store: SupportMetricsStore) => {
        const values = resolutionTimeSelector(store, setTitle)?.values
        return values ? values : emptyRange
    })
    const [[from, to], setRange] = useState<Array<number>>(appliedRange)

    useEffect(() => {
        setRange(appliedRange)
    }, appliedRange)

    const dispatch = useDispatch()

    const timer = useRef<{ timeout: NodeJS.Timeout | undefined }>({ timeout: undefined })

    const ticketResolutionTimeSelected = useSelector((store: SupportMetricsStore) => isTicketResolutionTimeSelector(store))
    if (ticketResolutionTimeSelected)
        return null

    function onFromChange(from: number) {
        let range: Array<number> = []
        if (to > from)
            range = [from, to]
        else
            range = [from, from + 1]
        onValueChange(range)
    }

    function onToChange(to: number) {
        let range: Array<number> = []
        if (to > from)
            range = [from, to]
        else if (to)
            range = [to - 1, to]
        onValueChange(range)
    }

    function onValueChange(range: Array<number>) {
        if (timer.current.timeout != null)
            clearTimeout(timer.current.timeout)

        const [newFrom, newTo] = range.length ? range : emptyRange
        setRange([newFrom, newTo])

        if (newFrom != from || newTo != to) {
            timer.current.timeout = setTimeout(() => {
                dispatch(changeResolutionTime({ stateId: setTitle, data: range }))
                clearTimeout(timer.current.timeout)
            }, 700)
        }
    }

    function clear() {
        setRange(emptyRange)
        dispatch(changeResolutionTime({ stateId: setTitle, data: [] }))
    }

    const defaultProps = {
        min: 0,
        stylingMode: 'filled' as const,
        step: 1,
        showSpinButtons: true,
        useLargeSpinButtons: true,
        mode: 'number' as const,
        defaultValue: 0,
    }

    return (<div className='BetweenSelectorContainer'>
        <div className='Content'>
            <div className='LabelWithoutButton'>Ticket resolution time</div>
            <div className='Selector'>
                <NumberBox
                    value={from}
                    onValueChange={onFromChange}
                    {...defaultProps}
                />
                <i className='dx-icon-to dx-icon-custom-style'></i>
                <NumberBox
                    value={to}
                    onValueChange={onToChange}
                    {...defaultProps}
                />
            </div>
        </div>
        {(appliedRange != emptyRange) ?
            <Button
                {...getClearButtonOptions()}
                onClick={clear}
            /> :
            null}
    </div>)
}
