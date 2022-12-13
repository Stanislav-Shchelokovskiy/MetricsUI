import React from 'react'
import OptionSelectorWithFetch from '../../common/components/OptionSelector'
import { changeGroupByPeriod } from '../store/Actions'
import { CustomersActivityStore } from '../store/Store'
import { fetchGroupByPeriods, GroupByPeriod } from '../network_resource_fetcher/FetchGroupByPeriods'


export default function GroupByPeriodSelector() {
    const stateSelector = (store: CustomersActivityStore) => store.customersActivity.groupByPeriod
    const defaultValueSelector = (values: Array<GroupByPeriod>) => values[0]?.format

    return (
        <OptionSelectorWithFetch<GroupByPeriod, string>
            className='CustomersActivity_GroupByPeriodSelector'
            displayExpr='name'
            valueExpr='format'
            fetchDataSourceValues={fetchGroupByPeriods}
            stateSelector={stateSelector}
            defaultValueSelector={defaultValueSelector}
            onValueChange={changeGroupByPeriod}
            label='Group by' />
    )
} 
