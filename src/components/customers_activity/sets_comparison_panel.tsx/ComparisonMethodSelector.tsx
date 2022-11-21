import React, { useReducer, useEffect } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from '../../common/LoadIndicator'

export default function ComparisonMethodSelector() {
    return (
        <SelectBox
            className='CustomersActivity_ComparisonMethodSelector'
            dataSource={['Absolute', 'Relative']}
            defaultValue={'Absolute'}
            // onValueChange={ }
            label='Comparison method'
            labelMode='static'>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </SelectBox >
    )
} 
