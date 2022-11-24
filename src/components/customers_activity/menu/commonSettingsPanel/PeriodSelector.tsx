import React, { useReducer, useEffect, useCallback, useRef } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { RangeSelector as DxRangeSelector, Margin, Scale, MinorTick, SliderMarker } from 'devextreme-react/range-selector'
import LoadIndicator from '../../../common/LoadIndicator'
import { fetchPeriod, Period } from '../../network_resource_fetcher/FetchPeriod'
import FetchResult from '../../../common/FetchResult'
import { changePeriod } from '../../store/Actions'
import { useAppDispatch, useAppSelector, AppStore } from '../../../common/AppStore'

interface PeriodSelectorState {
    periodStart: string
    periodEnd: string
    selectedRange: Array<Date>
}

const INITIAL_STATE: PeriodSelectorState = {
    periodStart: '',
    periodEnd: '',
    selectedRange: Array<Date>()
}

const CHANGE_PERIOD = 'change_period'
const CHANGE_SELECTED_RANGE = 'change_selected_range'

function periodSelectorStateReducer(state: PeriodSelectorState, action: AnyAction): PeriodSelectorState {
    switch (action.type) {
        case CHANGE_PERIOD:
            return {
                ...state,
                periodStart: action.payload.period_start,
                periodEnd: action.payload.period_end
            }
        case CHANGE_SELECTED_RANGE:
            return {
                ...state,
                selectedRange: action.payload
            }
        default:
            return state
    }
}

export default function PeriodSelector() {
    const renderCount = useRef(0)
    console.log('CustomersActivity PeriodSelector render: ', renderCount.current++)

    const [periodSelectorState, periodSelectorStateDispatch] = useReducer(periodSelectorStateReducer, INITIAL_STATE)
    const selectedRange = useAppSelector((store: AppStore) => store.customersActivity.range) || periodSelectorState.selectedRange

    useEffect(() => {
        (async () => {
            const periodFetchResult: FetchResult<Period> = await fetchPeriod()
            if (periodFetchResult.success) {
                periodSelectorStateDispatch({ type: CHANGE_PERIOD, payload: periodFetchResult.data })
            }
        })()
    }, [])

    const dispatch = useAppDispatch()
    const onRangeChange = useCallback((selectedRange: Array<Date>) => {
        dispatch(changePeriod(selectedRange))
    }, [dispatch])

    if (periodSelectorState.periodStart) {
        return (
            <DxRangeSelector
                id='range-selector'
                defaultValue={selectedRange}
                className='CustomersActivity_PeriodSelector'
                size={{ height: 125 }}
                onValueChange={onRangeChange}
            >
                <Margin top={10} />
                <Scale
                    startValue={new Date(periodSelectorState.periodStart)}
                    endValue={new Date(periodSelectorState.periodEnd)}
                    endOnTick={true}
                    //workdaysOnly={true}
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
