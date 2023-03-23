import React, { useCallback } from 'react'
import DateBox from 'devextreme-react/date-box'
import { ClosedBugsSelectorWrapper } from './BugsSelectors'
import RangePeriodSelector, { PeriodGroupBy } from '../../../../../common/components/RangePeriodSelector'
import { changePeriod } from '../../../../store/actions/Common'
import { CustomersActivityStore } from '../../../../store/Store'
import { fetchPeriod } from '../../../../network_resource_fetcher/FetchPeriod'
import useDataSource, { DataSourceProps } from '../../../../../common/hooks/UseDataSource'
import LoadIndicator from '../../../../../common/components/LoadIndicator'


export default function ClosedOnSelector({ setTitle }: { setTitle: string }) {
    const rangeSelector = useCallback((store: CustomersActivityStore) => store.customersActivity.range, [])
    return <ClosedBugsSelectorWrapper
        Wrapped={BetweenPeriodSelector}
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

function BetweenPeriodSelector(props: Props) {
    const [periodStart, periodEnd] = useDataSource<string>(props.dataSource, props.fetchDataSource, props.fetchArgs)
    if (periodStart) {
        return <div className='CustomersActivity_BetweenPeriodSelectorContainer'>
            <div>{props.label} between</div>
            <div className='CustomersActivity_BetweenPeriodSelector'>
                <DateSelector
                    min={periodStart}
                    max={periodEnd}
                />
                <div>and</div>
                <DateSelector
                    min={periodStart}
                    max={periodEnd}
                />
            </div>
        </div>
    }
    return <LoadIndicator width={50} height={50} />
}

interface DateSelectorProps {
    min: string
    max: string
}
function DateSelector(props: DateSelectorProps) {
    return <DateBox
        showClearButton={true}
        {...props}
    />
}


const defaultProps = {
    dataSource: ['', ''],
    fetchDataSource: undefined,
    fetchArgs: [],
}

BetweenPeriodSelector.defaultProps = defaultProps
