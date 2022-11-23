import React, { useState, useEffect } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/LoadIndicator'

export default function TicketsTagsSelector() {
    return (
        <TagBox
            className='CustomersActivity_TicketsTagsSelector'
            // displayExpr='name'
            // valueExpr='id'
            dataSource={['Tag1', 'Tag2']}
            defaultValue={['Tag1']}
            // onValueChange={onTribeSelect}
            placeholder='Select tickets tags'
            multiline={true}
            searchEnabled={true}
            showDropDownButton={false}
            label='Tickets tags'
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </TagBox>
    )
} 
