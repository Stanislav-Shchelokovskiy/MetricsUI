import React, { useState, useEffect, useCallback } from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'

export default function SetsSelector() {

    const onSelectionChanged = useCallback((e: any) => {
        var selItems = e.component.option("selectedItems");
        if (selItems && selItems.length >= 2) {
            e.component.option("dropDownOptions", { disabled: true });
        } else {
            e.component.option("dropDownOptions", { disabled: false });
        }
    }, [])
    return (
        <TagBox className='CustomersActivity_SetsSelector'
            // displayExpr='name'
            // valueExpr='id'
            dataSource={['Set1', 'Set2', 'Set3']}
            defaultValue={['Set1']}
            onSelectionChanged={onSelectionChanged}
            // onValueChange={onTribeSelect}
            placeholder='Select sets for comparison...'
            multiline={true}
            //showSelectionControls={true}
            showDropDownButton={false}
            label='Sets'
            labelMode='static'>
            <DropDownOptionsTagBox
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </TagBox>
    )
}
