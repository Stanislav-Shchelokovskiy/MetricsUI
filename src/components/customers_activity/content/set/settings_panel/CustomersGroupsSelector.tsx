import React, { useState, useEffect, useRef } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/LoadIndicator'

function CustomersGroupsSelector() {
    const renderCount = useRef(0)
    console.log(' CustomersGroupsSelector render ', renderCount.current++)

    return (
        <TagBox
            className='CustomersActivity_CustomersGroupsSelector'
            // displayExpr='name'
            // valueExpr='id'
            dataSource={['Group1', 'Group2']}
            defaultValue={['Group1']}
            // onValueChange={onTribeSelect}
            placeholder='Select customers groups'
            multiline={true}
            searchEnabled={true}
            showDropDownButton={false}
            label='Customers groups'
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </TagBox>
    )
}

export default React.memo(CustomersGroupsSelector)
