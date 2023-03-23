import React, { useCallback, useRef, useMemo } from 'react'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RangeSelector as DxRangeSelector, Margin, Scale, ScaleLabel, SliderMarker, Behavior } from 'devextreme-react/range-selector'
import LoadIndicator from './LoadIndicator'
import useDataSource, { DataSourceProps } from '../hooks/UseDataSource'
import { useValidate } from '../hooks/UseValidate'

type Period = [Date, Date]
type PeriodStr = Array<string>
export type PeriodGroupBy = '%Y-%m-%d' | '%Y-%W' | '%Y-%m' | '%Y'

function dateToISOstr(date: Date): string {
    const offset = date.getTimezoneOffset()
    return new Date(date.getTime() - (offset * 60 * 1000)).toISOString().slice(0, 10)
}

function validatePeriod(period: PeriodStr | any, possiblePeriod: PeriodStr, _: any = undefined): [PeriodStr, boolean] {
    const [possiblePeriodStartStr, possiblePeriodEndStr] = possiblePeriod
    const possiblePeriodStart = new Date(possiblePeriodStartStr)
    const possiblePeriodEnd = new Date(possiblePeriodEndStr)
    if (period.length = 2) {
        const [periodStartStr, periodEndStr] = period
        const periodStart = new Date(periodStartStr)
        const periodEnd = new Date(periodEndStr)

        if (possiblePeriodStart <= periodStart && periodEnd <= possiblePeriodEnd)
            return [[periodStartStr, periodEndStr], false]
        else if (periodStart < possiblePeriodStart && periodEnd <= possiblePeriodEnd)
            return [[possiblePeriodStartStr, periodEndStr], true]
        else if (possiblePeriodStart <= periodStart && possiblePeriodEnd < periodEnd)
            return [[periodStartStr, possiblePeriodEndStr], true]
    }
    return [[possiblePeriodStartStr, possiblePeriodEndStr], true]
}

interface Props extends DataSourceProps<string> {
    className: string
    rangeSelector: (store: any) => PeriodStr | undefined
    groupBySelector: ((store: any) => PeriodGroupBy)
    onPeriodChange: (period: PeriodStr) => PayloadAction<PeriodStr>
}

export default function RangePeriodSelector(props: Props) {
    const selectedRange = useRef<PeriodStr>([])
    selectedRange.current = useSelector(props.rangeSelector) || []

    const groupByPeriod = useSelector(props.groupBySelector)
    const minorTickIntervals = useMemo(() => {
        return {
            '%Y-%m-%d': 'day',
            '%Y-%W': 'week',
            '%Y-%m': 'week',
            '%Y': 'month',
        }
    }, [])
    const minorTickInterval = minorTickIntervals[groupByPeriod as keyof typeof minorTickIntervals]

    const validateSelectedValues = useValidate(selectedRange.current, props.onPeriodChange, undefined, validatePeriod)
    const [periodStart, periodEnd] = useDataSource(props.dataSource, props.fetchDataSource, props.fetchArgs, validateSelectedValues)

    const dispatch = useDispatch()
    const changeRange = useCallback((newRange: Period) => {
        dispatch(props.onPeriodChange(newRange.map(dateToISOstr)))
    }, [dispatch])

    const onIncidentOccurred = useCallback((e: any) => {
        const [validPeriod, periodIsInvalid] = validatePeriod(selectedRange.current, [periodStart, periodEnd])
        if (periodIsInvalid)
            changeRange(validPeriod.map(x=> new Date(x)) as Period)
    }, [changeRange, periodStart, periodEnd])

    const tick = useMemo(() => { return { visible: false } }, [])

    if (periodStart) {
        return (
            <DxRangeSelector
                id={`range-selector${props.className}`}
                value={selectedRange.current}
                className={props.className}
                size={{ height: 125 }}
                onValueChange={changeRange}
                onIncidentOccurred={onIncidentOccurred}
            >
                <Margin top={10} />
                <Scale
                    startValue={new Date(periodStart)}
                    endValue={new Date(periodEnd)}
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
    return <LoadIndicator width={50} height={50} />
}


const defaultProps = {
    dataSource: ['', ''],
    fetchDataSource: undefined,
    fetchArgs: [],
    groupBySelector: (store: any) => '%Y-%m-%d'
}

RangePeriodSelector.defaultProps = defaultProps
