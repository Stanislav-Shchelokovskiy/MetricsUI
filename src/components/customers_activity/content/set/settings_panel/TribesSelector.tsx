import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'

export default function TribesSelector() {
    return (
        <TagBox className='CustomersActivity_TribesSelector'
            // displayExpr='name'
            // valueExpr='id'
            dataSource={['Tribe1', 'Tribe2', 'Tribe3']}
            defaultValue={['Tribe1']}
            // onValueChange={onTribeSelect}
            placeholder='Select tribes to display...'
            multiline={true}
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Tribes'
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </TagBox>
    )
}