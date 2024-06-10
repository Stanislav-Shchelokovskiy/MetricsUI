import React, { useCallback, useMemo } from 'react'
import DateRangeBox from 'devextreme-react/date-range-box'
import { useDispatch } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../../../../../common/Typing'
import { DataSourceProps } from '../../../../../common/hooks/UseDataSource'
import RangePeriodSelector, { RangeSelectorProps } from '../../../../../common/components/RangePeriodSelector'
import Button, { getClearButtonOptions, getIncludeButtonOptions } from '../../../../../common/components/Button'
import { SupportMetricsStore } from '../../../../store/Store'
import { FilterParameters } from '../../../../../common/store/multiset_container/sets/Interfaces'

interface Props extends DataSourceProps<string> {
    className: string
    label: string
    setTitle: string
    valueSelector: (store: SupportMetricsStore, setTitle: string) => FilterParameters<string> | undefined
    changeSelection: (payload: Payload<string, Array<string>>) => PayloadAction<Payload<string, Array<string>>>
    changeInclude: (payload: Payload<string, boolean>) => PayloadAction<Payload<string, boolean>>
}

export default function BetweenPeriodSelectorWrapper(props: Props) {
    const rangeSelector = (store: SupportMetricsStore) => props.valueSelector(store, props.setTitle)
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
    const node = props.selectedRange as FilterParameters<string>
    const [startStr, endStr] = node?.values || [undefined, undefined]
    const [start, end] = validatePeriod(new Date(startStr || periodStart), new Date(endStr || periodEnd))

    const onPeriodChange = useCallback((period: Array<Date | any>) => {
        const [newStart, newEnd] = period
        if (newStart == null || newEnd == null)
            return
        props.changeRange(validatePeriod(newStart, newEnd))
    }, [start, end])

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
    return <div className='BetweenSelectorContainer'>
        <Button {...includeButtonOptions} />
        <div className='Content'>
            <div className='Label'>{props.label} between</div>
            <DateRangeBox
                className='BetweenPeriodSelector'
                startDateLabel=''
                endDateLabel=''
                stylingMode='filled'
                min={periodStart}
                max={periodEnd}
                startDate={start}
                endDate={end}
                showDropDownButton={false}
                onValueChange={onPeriodChange}
            >
            </DateRangeBox>
        </div>
        {valueIsChanged(props) ?
            <Button {...clearButtonOptions} /> :
            null}
    </div>
}

function valueIsChanged(props: RangeSelectorProps) {
    const selectedRange = (props.selectedRange as FilterParameters<string>)?.values
    return selectedRange?.length === 2 && (
        JSON.stringify(selectedRange[0]) !== JSON.stringify(props.periodStart) ||
        JSON.stringify(selectedRange[1]) !== JSON.stringify(props.periodEnd))
}
