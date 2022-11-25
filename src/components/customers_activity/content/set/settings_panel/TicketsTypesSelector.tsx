import React, { useState, useEffect, useRef } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from '../../../../common/LoadIndicator'

export default function TicketsTypesSelector() {
    const renderCount = useRef(0)
    console.log(' TicketsTypesSelector render ', renderCount.current++)

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
            searchEnabled={true}
            showDropDownButton={false}
            label='Tickets types'
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </TagBox>
    )
} 
