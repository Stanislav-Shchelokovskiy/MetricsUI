import React from 'react'
import OptionSelector from '../../OptionSelector'
import { changeGroupByPeriod } from '../../../../customers_activity/store/actions/Common'
import { CustomersActivityStore } from '../../../../customers_activity/store/Store'
import { fetchGroupByPeriods, GroupByPeriod } from '../../../../customers_activity/network_resource_fetcher/FetchGroupByPeriods'


export default function GroupByPeriodSelector() {
    const valueSelector = (store: CustomersActivityStore) => store.customersActivity.groupByPeriod
    const defaultValueSelector = (values: Array<GroupByPeriod>) => values[0]?.format

    return <OptionSelector<GroupByPeriod, string>
        className='ComparisonGraph_GroupByPeriodSelector'
        displayExpr='name'
        valueExpr='format'
        fetchDataSource={fetchGroupByPeriods}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeGroupByPeriod}
        label='Group by'
    />
} 
