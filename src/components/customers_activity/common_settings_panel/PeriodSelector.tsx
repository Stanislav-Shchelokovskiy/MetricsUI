import React, { useReducer, useEffect, useCallback, useRef, useMemo } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RangeSelector as DxRangeSelector, Margin, Scale, ScaleLabel, SliderMarker, Behavior } from 'devextreme-react/range-selector'
import LoadIndicator from '../../common/components/LoadIndicator'
import FetchResult from '../../common/Interfaces'
import { changePeriod } from '../store/actions/Common'
import { CustomersActivityStore } from '../store/Store'
import { fetchPeriod, Period } from '../network_resource_fetcher/FetchPeriod'


interface PeriodSelectorState {
    periodStart: string
    periodEnd: string
}


const INITIAL_STATE: PeriodSelectorState = {
    periodStart: '',
    periodEnd: '',
}

const CHANGE_PERIOD = 'change_period'


function periodSelectorStateReducer(state: PeriodSelectorState, action: AnyAction): PeriodSelectorState {
    switch (action.type) {
        case CHANGE_PERIOD:
            return {
                ...state,
                periodStart: action.payload.period_start,
                periodEnd: action.payload.period_end,
            }
        default:
            return state
    }
}

function validatePeriod(period: Array<string>, possiblePeriod: Array<string>): [Array<Date>, boolean] {
    const possiblePeriodStart = new Date(possiblePeriod[0])
    const possiblePeriodEnd = new Date(possiblePeriod[1])
    if (period.length > 0) {
        const periodStart = new Date(period[0])
        const periodEnd = new Date(period[1])

        if (possiblePeriodStart <= periodStart && periodEnd <= possiblePeriodEnd)
            return [[periodStart, periodEnd], false]
        else if (periodStart < possiblePeriodStart && periodEnd <= possiblePeriodEnd)
            return [[possiblePeriodStart, periodEnd], true]
        else if (possiblePeriodStart <= periodStart && possiblePeriodEnd < periodEnd)
            return [[periodStart, possiblePeriodEnd], true]
    }
    return [[possiblePeriodStart, possiblePeriodEnd], true]
}

export default function PeriodSelector() {
    const [periodSelectorState, periodSelectorStateDispatch] = useReducer(periodSelectorStateReducer, INITIAL_STATE)

    const selectedRange = useRef<Array<string>>([])
    selectedRange.current = useSelector((store: CustomersActivityStore) => store.customersActivity.range) || []

    const groupByPeriod = useSelector((store: CustomersActivityStore) => store.customersActivity.groupByPeriod)
    const minorTickIntervals = useMemo(() => {
        return {
            '%Y-%m-%d': 'day',
            '%Y-%W': 'week',
            '%Y-%m': 'week',
            '%Y': 'month',
        }
    }, [])
    const minorTickInterval = minorTickIntervals[groupByPeriod as keyof typeof minorTickIntervals]

    useEffect(() => {
        (async () => {
            const periodFetchResult: FetchResult<Period> = await fetchPeriod()
            if (periodFetchResult.success) {
                periodSelectorStateDispatch({ type: CHANGE_PERIOD, payload: periodFetchResult.data })
                const [validPeriod, periodIsInvalid] = validatePeriod(selectedRange.current, [periodFetchResult.data.period_start, periodFetchResult.data.period_end])
                if (periodIsInvalid)
                    dispatch(changePeriod(validPeriod))
            }
        })()
    }, [])

    const dispatch = useDispatch()
    const changeRange = useCallback((selectedRange: Array<Date>) => {
        dispatch(changePeriod(selectedRange))
    }, [dispatch])

    const onIncidentOccurred = useCallback((e: any) => {
        const [validPeriod, periodIsInvalid] = validatePeriod(selectedRange.current, [periodSelectorState.periodStart, periodSelectorState.periodEnd])
        if (periodIsInvalid)
            changeRange(validPeriod)
    }, [changeRange, periodSelectorState])

    const tick = useMemo(() => { return { visible: false } }, [])

    if (periodSelectorState.periodStart) {
        return (
            <DxRangeSelector
                id='range-selector'
                value={selectedRange.current}
                className='CustomersActivity_PeriodSelector'
                size={{ height: 125 }}
                onValueChange={changeRange}
                onIncidentOccurred={onIncidentOccurred}
            >
                <Margin top={10} />
                <Scale
                    startValue={new Date(periodSelectorState.periodStart)}
                    endValue={new Date(periodSelectorState.periodEnd)}
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
