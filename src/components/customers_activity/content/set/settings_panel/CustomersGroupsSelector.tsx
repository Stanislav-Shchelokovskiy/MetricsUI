import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/LoadIndicator'

export default function CustomersGroupsSelector() {
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
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Customers groups'
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </TagBox>
    )
} 
