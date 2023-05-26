import React, { useCallback, useMemo } from 'react'
import DateBox from 'devextreme-react/date-box'
import { useDispatch } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../../../common/Interfaces'
import { DataSourceProps } from '../../../../../common/hooks/UseDataSource'
import RangePeriodSelector, { RangeSelectorProps } from '../../../../../common/components/RangePeriodSelector'
import Button, { getClearButtonOptions, getIncludeButtonOptions } from '../../../../../common/components/Button'
import { CustomersActivityStore } from '../../../../store/Store'
import { SetState } from '../../../../store/sets_reducer/Interfaces'
import { FilterParametersNode } from '../../../../../common/store/multiset_container/sets/Interfaces'

interface Props extends DataSourceProps<string> {
    className: string
    label: string
    setTitle: string
    valueSelector: (x: SetState | undefined) => FilterParametersNode<string> | undefined
    changeSelection: (payload: Payload<string, Array<string>>) => PayloadAction<Payload<string, Array<string>>>
    changeInclude: (payload: Payload<string, boolean>) => PayloadAction<Payload<string, boolean>>
}

export default function BetweenPeriodSelectorWrapper(props: Props) {
    const rangeSelector = (store: CustomersActivityStore) => props.valueSelector(store.sets.find(x => x.title === props.setTitle))
    const onPeriodChange = (period: Array<string>) => props.changeSelection({ stateId: props.setTitle, data: period })
    const restOptions = { onIncludeChange: (include: boolean) => props.changeInclude({ stateId: props.setTitle, data: include }) }
    return <RangePeriodSelector
        CustomRangeSelector={BetweenPeriodSelector}
        onPeriodChange={onPeriodChange}
        rangeSelector={rangeSelector}
        {...props}
        {...restOptions}
    />
}

function BetweenPeriodSelector(props: RangeSelectorProps) {
    const validatePeriod = useCallback((startDate: Date, endDate: Date): [Date, Date] => {
        if (startDate > endDate)
            return [endDate, startDate]
        return [startDate, endDate]
    }, [])

    const periodStart = new Date(props.periodStart)
    const periodEnd = new Date(props.periodEnd)
    const node = props.selectedRange as FilterParametersNode<string>
    const [startStr, endStr] = node?.values || [undefined, undefined]
    const [start, end] = validatePeriod(new Date(startStr || periodStart), new Date(endStr || periodEnd))

    const onStartChange = useCallback((newStart: Date) => {
        props.changeRange(validatePeriod(newStart, end ? end : newStart))
    }, [end])

    const onEndChange = useCallback((newEnd: Date) => {
        props.changeRange(validatePeriod(start ? start : newEnd, newEnd))
    }, [start])

    const dispatch = useDispatch()
    const onIncludeChangeHandler = useCallback((include: boolean) => {
        if (props.onIncludeChange !== undefined) {
            dispatch(props.onIncludeChange(include))
        }
    }, [])

    const includeButtonOptions = useMemo(() => getIncludeButtonOptions(
        node !== undefined ? node.include : true,
        onIncludeChangeHandler,
    ), [node?.include])


    const clearButtonOptions = useMemo(() => {
        return {
            ...getClearButtonOptions(),
            onClick: () => {
                if (valueIsChanged(props))
                    props.changeRange(undefined)
            }
        }
    }, [start, end])

    return (
        <div className='CustomersActivity_BetweenPeriodSelectorContainer'>
            {props.onIncludeChange ?
                <Button {...includeButtonOptions} /> :
                null}

            <div className='Content'>
                <div>{props.label} between</div>
                <div className='Selector'>
                    <DateBox
                        className='DateEdit'
                        value={start}
                        min={periodStart}
                        max={periodEnd}
                        onValueChange={onStartChange}
                    />
                    <div>and</div>
                    <DateBox
                        className='DateEdit'
                        value={end}
                        min={periodStart}
                        max={periodEnd}
                        onValueChange={onEndChange}
                    />
                </div>
            </div>
            {valueIsChanged(props) ?
                <Button {...clearButtonOptions} /> :
                null}
        </div>
    )
}

function valueIsChanged(props: RangeSelectorProps) {
    const selectedRange = (props.selectedRange as FilterParametersNode<string>)?.values
    return selectedRange?.length === 2 && (
        JSON.stringify(selectedRange[0]) !== JSON.stringify(props.periodStart) ||
        JSON.stringify(selectedRange[1]) !== JSON.stringify(props.periodEnd))
}
