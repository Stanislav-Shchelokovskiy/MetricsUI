import React, { useReducer, useEffect } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'

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
