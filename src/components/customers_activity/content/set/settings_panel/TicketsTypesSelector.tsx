import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/LoadIndicator'

export default function TicketsTypesSelector() {
    return (
        <TagBox
            className='CustomersActivity_TicketsTypesSelector'
            // displayExpr='name'
            // valueExpr='id'
            dataSource={['Question', 'Bug']}
            defaultValue={['Bug']}
            // onValueChange={onTribeSelect}
            placeholder='Select tickets types'
            multiline={true}
            selectAllMode='allPages'
            showSelectionControls={true}
            showDropDownButton={false}
            label='Tickets types'
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </TagBox>
    )
} 
