import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'

export default function SetsSelector() {
    return (
        <TagBox className='CustomersActivity_SetsSelector'
            // displayExpr='name'
            // valueExpr='id'
            dataSource={['Set1', 'Set2', 'Set3']}
            defaultValue={['Set1']}
            // onValueChange={onTribeSelect}
            placeholder='Select sets for comparison...'
            multiline={true}
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Sets'
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </TagBox>
    )
}