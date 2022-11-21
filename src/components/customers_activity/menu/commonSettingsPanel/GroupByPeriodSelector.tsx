import React, { useReducer, useEffect } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from '../../../common/LoadIndicator'

export default function GroupByPeriodSelector() {
    return (
        <SelectBox
            className='CustomersActivity_GroupByPeriodSelector'
            dataSource={['day', 'week']}
            defaultValue={'day'}
            // onValueChange={ }
            label='Group by'
            labelMode='static'>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </SelectBox >
    )
} 
