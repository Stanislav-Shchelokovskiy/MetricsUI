import React, { useReducer, useEffect } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from '../../../common/LoadIndicator'

export default function MetricSelector() {
    return (
        <SelectBox
            className='CustomersActivity_MetricSelector'
            dataSource={['Tickets', 'Iterations']}
            defaultValue={'Tickets'}
            // onValueChange={ }
            label='Metric'
            labelMode='static'>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </SelectBox >
    )
} 
