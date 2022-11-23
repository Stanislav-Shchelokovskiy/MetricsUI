import React, { useState, useMemo } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import { changeGroupByPeriod } from '../../store/Actions'
import { useAppDispatch, useAppSelector, AppStore } from '../../../common/AppStore'

export default function GroupByPeriodSelector() {
    const groupByPeriods = useMemo<Array<string>>(() => { return ['Day', 'Week-Year', 'Month-Year', 'Year'] }, [])
    // const [groupByPeriod, setGroupByPeriod] = useState(groupByPeriods[0])
    const selectedGroupByPeriod = useAppSelector((store: AppStore) => store.customersActivity.groupByPeriod) || groupByPeriods[0]

    const appDispatch = useAppDispatch()
    const onGroupByPeriodChange: (groupByPeriod: string) => void = (groupByPeriod: string) => {
        //setGroupByPeriod(groupByPeriod)
        appDispatch(changeGroupByPeriod(groupByPeriod))
    }

    return (
        <SelectBox
            className='CustomersActivity_GroupByPeriodSelector'
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
