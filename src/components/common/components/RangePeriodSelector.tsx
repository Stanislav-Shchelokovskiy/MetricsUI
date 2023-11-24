import React, { useCallback, useRef, useMemo } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RangeSelector as DxRangeSelector, Margin, Scale, ScaleLabel, SliderMarker, Behavior } from 'devextreme-react/range-selector'
import LoadIndicator from './LoadIndicator'
import useDataSource, { DataSourceProps } from '../hooks/UseDataSource'
import { useMultiValidate } from '../hooks/UseValidate'
import { dateToISOstr, validatePeriod } from '../DateUtils'
import { Payload } from '../Typing'

type Period = [Date, Date]
type PeriodStr = Array<string>
type PeriodContainer = { values: PeriodStr | undefined }
export type PeriodGroupBy = '%Y-%m-%d' | '%Y-%W' | '%Y-%m' | '%Y'


export function rangeOrDefault(value: PeriodStr | undefined) {
    return value ? value : ['', '']
}

function getRange(val: PeriodContainer | PeriodStr | undefined): PeriodStr {
    return (Array.isArray(val) ? val : (val && 'values' in val ? (val as PeriodContainer).values : undefined)) || []
}

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
    const onPeriodChangeWrapper = (_: any, validValues: PeriodStr) => {
        return props.onPeriodChange(validValues)
    }
    const validateSelectedValues = useMultiValidate(getRange(selectedRange.current), onPeriodChangeWrapper, undefined, validatePeriod)
    const [periodStart, periodEnd] = useDataSource(props.dataSource, props.fetchDataSource, props.fetchArgs, validateSelectedValues)

    const dispatch = useDispatch()
    const changeRange = useCallback((newRange: Period | undefined) => {
        dispatch(props.onPeriodChange(newRange ? newRange.map(dateToISOstr) : []))
    }, [dispatch])

    const onIncidentOccurred = useCallback((e: any) => {
        const [validPeriod, periodIsValid] = validatePeriod([periodStart, periodEnd], getRange(selectedRange.current))
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
    const minorTickIntervals = useMemo(() => {
        return {
            '%Y-%m-%d': 'day',
            '%Y-%W': 'week',
            '%Y-%m': 'week',
            '%Y': 'month',
        }
    }, [])
    const minorTickInterval = minorTickIntervals[props.groupByPeriod as keyof typeof minorTickIntervals]
    const tick = useMemo(() => { return { visible: false } }, [])
    return (
        <DxRangeSelector
            id={`range-selector${props.className}`}
            value={getRange(props.selectedRange)}
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
