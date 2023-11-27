import React, { useCallback, useRef, useMemo } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RangeSelector as DxRangeSelector, Margin, Scale, ScaleLabel, SliderMarker, Behavior } from 'devextreme-react/range-selector'
import LoadIndicator from './LoadIndicator'
import useDataSource, { DataSourceProps } from '../hooks/UseDataSource'
import { useMultiValidate } from '../hooks/UseValidate'
import { dateToISOstr, validatePeriod, getPeriod, PeriodContainer, PeriodStr } from '../DatePeriodUtils'
import { Payload } from '../Typing'

type Period = [Date, Date]

export type PeriodGroupBy = '%Y-%m-%d' | '%Y-%W' | '%Y-%m' | '%Y-%Q' | '%Y' | string

interface Props extends DataSourceProps<string> {
    className: string
    rangeSelector: (store: any) => PeriodContainer | PeriodStr | undefined
    groupBySelector: ((store: any) => PeriodGroupBy)
    onPeriodChange: (period: PeriodStr) => PayloadAction<PeriodStr> | PayloadAction<Payload<string, Array<string>>>
    CustomRangeSelector: React.FC<RangeSelectorProps>
}

export default function RangePeriodSelector(props: Props) {
    const selectedRange = useRef<PeriodStr | PeriodContainer | undefined>([])
    selectedRange.current = useSelector(props.rangeSelector)
    const onPeriodChangeWrapper = (_: any, validValues: PeriodStr) => props.onPeriodChange(validValues)
    const validateSelectedValues = useMultiValidate(getPeriod(selectedRange.current), onPeriodChangeWrapper, undefined, validatePeriod)
    const [periodStart, periodEnd] = useDataSource(props.dataSource, props.fetchDataSource, props.fetchArgs, validateSelectedValues)

    const dispatch = useDispatch()
    const changeRange = useCallback((newRange: Period | undefined) => {
        dispatch(props.onPeriodChange(newRange ? newRange.map(dateToISOstr) : []))
    }, [dispatch])

    const onIncidentOccurred = useCallback((e: any) => {
        const [validPeriod, periodIsValid] = validatePeriod([periodStart, periodEnd], getPeriod(selectedRange.current))
        if (!periodIsValid)
            changeRange(validPeriod.map(x => new Date(x)) as Period)
    }, [changeRange, periodStart, periodEnd])

    const groupByPeriod = useSelector(props.groupBySelector)

    if (periodStart) {
        return <props.CustomRangeSelector
            selectedRange={selectedRange.current}
            periodStart={periodStart}
            periodEnd={periodEnd}
            groupByPeriod={groupByPeriod}
            changeRange={changeRange}
            onIncidentOccurred={onIncidentOccurred}
            {...props}
        />
    }
    return <LoadIndicator width={50} height={50} />
}


export interface RangeSelectorProps {
    className: string
    selectedRange: PeriodContainer | PeriodStr | undefined
    periodStart: string
    periodEnd: string
    groupByPeriod: PeriodGroupBy
    changeRange: (newRange: Period | undefined) => void
    onIncidentOccurred: (e: any) => void
    [k: string]: any
}

function DefaultRangeSelector(props: RangeSelectorProps) {
    const minorTickInterval = {
        '%Y-%m-%d': 'day',
        '%Y': 'month',
    }[props.groupByPeriod] || 'week'
    const tick = useMemo(() => { return { visible: false } }, [])
    return (
        <DxRangeSelector
            id={`range-selector${props.className}`}
            value={getPeriod(props.selectedRange)}
            className={props.className}
            size={{ height: 125 }}
            onValueChange={props.changeRange}
            onIncidentOccurred={props.onIncidentOccurred}
        >
            <Margin top={10} />
            <Scale
                startValue={new Date(props.periodStart)}
                endValue={new Date(props.periodEnd)}
                endOnTick={true}
                minorTickInterval={minorTickInterval}
                tickInterval='month'
                minRange='day'
                minorTick={tick}
            >
                <Behavior snapToTicks={false} animationEnabled={false} />
                <ScaleLabel format={'month'} />
            </Scale>
            <Behavior snapToTicks={minorTickInterval !== 'day'} animationEnabled={false} />
            <SliderMarker format='monthAndDay' />
        </DxRangeSelector >
    )
}

const defaultProps = {
    className: '',
    dataSource: ['', ''],
    fetchDataSource: undefined,
    fetchArgs: [],
    groupBySelector: (store: any) => '%Y-%m-%d',
    CustomRangeSelector: DefaultRangeSelector
}

RangePeriodSelector.defaultProps = defaultProps
