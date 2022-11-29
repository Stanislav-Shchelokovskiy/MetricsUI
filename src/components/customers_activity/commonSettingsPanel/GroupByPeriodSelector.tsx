import React from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
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
    const onGroupByPeriodChange: (groupByPeriod: string) => void = (groupByPeriod: string) => {
        appDispatch(changeGroupByPeriod(groupByPeriod))
    }

    if(!selectedGroupByPeriod){
        selectedGroupByPeriod = groupByPeriods[0].format
        appDispatch(changeGroupByPeriod(selectedGroupByPeriod))
    }

    return (
        <SelectBox
            className='CustomersActivity_GroupByPeriodSelector'
            displayExpr='name'
            valueExpr='format'
            dataSource={groupByPeriods}
            defaultValue={selectedGroupByPeriod}
            onValueChange={onGroupByPeriodChange}
            label='Group by'
            labelMode='static'>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </SelectBox >
    )
} 
