import React, { useCallback, useMemo } from 'react'
import DateBox from 'devextreme-react/date-box'
import { ClosedBugsSelectorWrapper } from './BugsSelectors'
import RangePeriodSelector, { RangeSelectorProps } from '../../../../../common/components/RangePeriodSelector'
import { changePeriod } from '../../../../store/actions/Common'
import { CustomersActivityStore } from '../../../../store/Store'
import { fetchPeriod } from '../../../../network_resource_fetcher/FetchPeriod'
import useDataSource, { DataSourceProps } from '../../../../../common/hooks/UseDataSource'
import { PayloadAction } from '@reduxjs/toolkit'
import LoadIndicator from '../../../../../common/components/LoadIndicator'
import Button, { getClearButtonOptions, getIncludeButtonOptions } from '../../../../../common/components/Button'


export default function ClosedOnSelector({ setTitle }: { setTitle: string }) {
    const rangeSelector = useCallback((store: CustomersActivityStore) => store.customersActivity.range, [])
    return <ClosedBugsSelectorWrapper
        Wrapped={BetweenPeriodSelectorWrapper}
        setTitle={setTitle}
        className='CustomersActivity_ClosedOnSelector'
        label='Bugs closed'
        fetchDataSource={fetchPeriod}
    />
}


interface Props extends DataSourceProps<string> {
    className: string
    label: string
}

function BetweenPeriodSelectorWrapper(props: Props) {
    const rangeSelector = useCallback((store: CustomersActivityStore) => store.customersActivity.range, [])
    const onPeriodChange = useCallback((period: Array<string>): PayloadAction<Array<string>> => {
        return {
            type: 'tmp',
            payload: period
        }
    }, [])

    return <RangePeriodSelector
        CustomRangeSelector={BetweenPeriodSelector}
        onPeriodChange={onPeriodChange}
        rangeSelector={rangeSelector}
        {...props}
    />
}



function BetweenPeriodSelector(props: RangeSelectorProps) {

    const onIncludeChangeHandler = useCallback((include: boolean) => {
        if (props.onIncludeChange !== undefined) {
            // dispatch(props.onIncludeChange(include))
        }
    }, [])

    const includeButtonOptions = useMemo(() => getIncludeButtonOptions(
        true,//props.includeButtonState === undefined ? true : props.includeButtonState,
        onIncludeChangeHandler,
    ), [props.includeButtonState])
    const clearButtonOptions = useMemo(() => {
        return {
            ...getClearButtonOptions(),
            onClick: () => {
                // tagBoxRef.current?.instance.option('value', props.defaultValue)
            }
        }
    }, [props.defaultValue])
    const [start, end] = props.selectedRange
    return <div className='CustomersActivity_BetweenPeriodSelectorContainer'>
        <Button 
        {...includeButtonOptions} 
        />
        <div className='Content'>
            <div>{props.label} between</div>
            <div className='Selector'>
                <DateSelector
                    value={start}
                    min={props.periodStart}
                    max={props.periodEnd}
                />
                <div>and</div>
                <DateSelector
                    value={end}
                    min={props.periodStart}
                    max={props.periodEnd}
                />
            </div>

        </div>
        {start ?
            <Button {...clearButtonOptions} /> :
            null}
    </div>
}

interface DateSelectorProps {
    min: string
    max: string
    value: string
}
function DateSelector(props: DateSelectorProps) {
    return <DateBox
        {...props}
    />
}
