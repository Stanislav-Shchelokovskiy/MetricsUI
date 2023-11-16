import React, { useRef } from 'react'
import { NumberBox } from 'devextreme-react/number-box'
import { useSelector, useDispatch } from 'react-redux'
import { SupportMetricsStore } from '../../../../store/Store'
import { changeResolutionTime } from '../../../../store/actions/Tickets'
import { useSetTitle } from '../../../../../common/components/multiset_container/set/SetContext'
import { resolutionTimeSelector } from '../../../../store/sets/Selectors'
import Button, { getClearButtonOptions } from '../../../../../common/components/Button'


export default function ResolutionTimeSelector() {
    const emptyRange = [0, 0]
    const setTitle = useSetTitle()
    const [from, to] = useSelector((store: SupportMetricsStore) => {
        const values = resolutionTimeSelector(store, setTitle)?.values
        return values ? values : emptyRange
    })

    const toRef = useRef<NumberBox>(null)
    const fromRef = useRef<NumberBox>(null)
    const lockUpdate = useRef(false)

    function setValues(range: Array<number>) {
        const [newFrom, newTo] = range.length ? range : emptyRange
        if (newFrom != from || newTo != to) {
            lockUpdate.current = true
            fromRef.current?.instance.option('value', newFrom)
            toRef.current?.instance.option('value', newTo)
            lockUpdate.current = false
            dispatch(changeResolutionTime({ stateId: setTitle, data: range }))
        }
    }

    const onFromChange = (from: number) => {
        if (lockUpdate.current)
            return
        let range: Array<number> = []
        if (to > from)
            range = [from, to]
        else
            range = [from, from + 1]
        onValueChange(range)
    }

    const onToChange = (to: number) => {
        if (lockUpdate.current)
            return
        let range: Array<number> = []
        if (to > from)
            range = [from, to]
        else if (to)
            range = [to - 1, to]
        onValueChange(range)
    }

    const dispatch = useDispatch()
    let timerId: NodeJS.Timeout | undefined = undefined
    const onValueChange = (range: Array<number>) => {
        if (timerId !== undefined)
            clearTimeout(timerId)
        timerId = setTimeout(() => {
            setValues(range)
            clearTimeout(timerId)
        }, 700)
    }

    const defaultProps = {
        className: 'CustomersActivity_SingleSelector',
        min: 0,
        placeholder: '...',
        step: 1,
        showSpinButtons: true,
        useLargeSpinButtons: true,
        mode: 'number' as any,
    }

    return (<div className='CustomersActivity_BetweenSelectorContainer'>
        <div className='Content'>
            <div className='Label'>Ticket resolution time</div>
            <div className='Selector'>
                <NumberBox
                    ref={fromRef}
                    defaultValue={from}
                    onValueChange={onFromChange}
                    label='from'
                    {...defaultProps}
                />
                <NumberBox
                    ref={toRef}
                    defaultValue={to}
                    onValueChange={onToChange}
                    label='to'
                    {...defaultProps}
                />
            </div>
        </div>
        {(from || to) ?
            <Button
                {...getClearButtonOptions()}
                onClick={() => setValues([])}
            /> :
            null}
    </div>)
}
