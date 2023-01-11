import React, { useReducer, useEffect, useCallback, useRef } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { RangeSelector as DxRangeSelector, Margin, Scale, MinorTick, SliderMarker } from 'devextreme-react/range-selector'
import LoadIndicator from '../../common/components/LoadIndicator'
import FetchResult from '../../common/Interfaces'
import { changePeriod } from '../store/Actions'
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

function periodIsInvalid(period: Array<string>, possiblePeriod: Array<string>) {
    if (period.length > 0) {
        const periodStart = new Date(period[0])
        const periodEnd = new Date(period[1])
        const possiblePeriodStart = new Date(possiblePeriod[0])
        const possiblePeriodEnd = new Date(possiblePeriod[1])

        if (possiblePeriodStart <= periodStart && periodEnd <= possiblePeriodEnd)
            return false
    }
    return true
}

export default function PeriodSelector() {
    const [periodSelectorState, periodSelectorStateDispatch] = useReducer(periodSelectorStateReducer, INITIAL_STATE)

    const selectedRange = useRef<Array<string>>([])
    selectedRange.current = useSelector((store: CustomersActivityStore) => store.customersActivity.range) || []

    useEffect(() => {
        (async () => {
            const periodFetchResult: FetchResult<Period> = await fetchPeriod()
            if (periodFetchResult.success) {
                periodSelectorStateDispatch({ type: CHANGE_PERIOD, payload: periodFetchResult.data })
                if (periodIsInvalid(selectedRange.current, [periodFetchResult.data.period_start, periodFetchResult.data.period_end])) {
                    dispatch(changePeriod([
                        new Date(periodFetchResult.data.period_start),
                        new Date(periodFetchResult.data.period_end),
                    ]))
                }
            }
        })()
    }, [])

    const dispatch = useDispatch()
    const onRangeChange = useCallback((selectedRange: Array<Date>) => {
        dispatch(changePeriod(selectedRange))
    }, [dispatch])

    if (periodSelectorState.periodStart) {
        return (
            <DxRangeSelector
                id='range-selector'
                value={selectedRange.current}
                className='CustomersActivity_PeriodSelector'
                size={{ height: 125 }}
                onValueChange={onRangeChange}
            >
                <Margin top={10} />
                <Scale
                    startValue={new Date(periodSelectorState.periodStart)}
                    endValue={new Date(periodSelectorState.periodEnd)}
                    endOnTick={true}
                    minorTickInterval='week'
                    tickInterval='month'
                    minRange='week'
                    aggregationInterval='day'
                >
                    <MinorTick visible={false} />
                </Scale>
                <SliderMarker format='monthAndDay' />
            </DxRangeSelector>
        )
    }
    return <LoadIndicator width={50} height={50} />
}
