import React from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { changeGroupByPeriod } from '../store/Actions'
import { useAppDispatch, useAppSelector, AppStore } from '../../common/AppStore'


interface GroupByPeriod {
    name: string
    format: string
}

/* 
    format should contain a valid strftime string.
    https://sqlite.org/lang_datefunc.html 
*/
const groupByPeriods: Array<GroupByPeriod> = [
    { name: 'Day', format: '%Y-%m-%d' },
    { name: 'Week-Year', format: '%Y-%W' },
    { name: 'Month-Year', format: '%Y-%m' },
    { name: 'Year', format: '%Y' },
]


export default function GroupByPeriodSelector() {
    let selectedGroupByPeriod = useAppSelector((store: AppStore) => store.customersActivity.groupByPeriod)

    const appDispatch = useAppDispatch()
    const onGroupByPeriodChange: (value: string) => void = (value: string) => {
        appDispatch(changeGroupByPeriod(value))
    }

    if (!selectedGroupByPeriod) {
        selectedGroupByPeriod = groupByPeriods[0].format
        appDispatch(changeGroupByPeriod(selectedGroupByPeriod))
    }

    return (
        <OptionSelector<GroupByPeriod, string>
            className='CustomersActivity_GroupByPeriodSelector'
            displayExpr='name'
            valueExpr='format'
            dataSource={groupByPeriods}
            selectedValue={selectedGroupByPeriod}
            onValueChange={onGroupByPeriodChange}
            label='Group by' />
    )
} 
