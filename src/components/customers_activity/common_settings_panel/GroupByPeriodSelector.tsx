import React from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { changeGroupByPeriod } from '../store/actions/Common'
import { CustomersActivityStore } from '../store/Store'
import { fetchGroupByPeriods, GroupByPeriod } from '../network_resource_fetcher/FetchGroupByPeriods'


export default function GroupByPeriodSelector() {
    const valueSelector = (store: CustomersActivityStore) => store.customersActivity.groupByPeriod
    const defaultValueSelector = (values: Array<GroupByPeriod>) => values[0]?.format

    return <OptionSelector<GroupByPeriod, string>
        className='CustomersActivity_GroupByPeriodSelector'
        displayExpr='name'
        valueExpr='format'
        fetchDataSource={fetchGroupByPeriods}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeGroupByPeriod}
        label='Group by'
    />
} 
