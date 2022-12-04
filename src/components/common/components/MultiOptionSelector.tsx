import React from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from './LoadIndicator'


export default function MultiOptionSelector<dataSourceT, valueExprT>(
    {
        className,
        displayExpr,
        valueExpr,
        placeholder,
        label,
        dataSource,
        selectedValues,
        onValueChange,
        showSelectionControls,
    }: {
        className: string
        displayExpr: string
        valueExpr: string
        placeholder: string
        label: string
        dataSource: Array<dataSourceT>
        selectedValues: Array<valueExprT>
        onValueChange: (values: Array<valueExprT>) => void
        showSelectionControls: boolean
    }) {
    if (dataSource.length > 0) {
        return (
            <TagBox
                className={className}
                displayExpr={displayExpr}
                valueExpr={valueExpr}
                placeholder={placeholder}
                label={label}
                dataSource={dataSource}
                defaultValue={selectedValues}
                onValueChange={onValueChange}

                showSelectionControls={showSelectionControls}
                multiline={true}
                searchEnabled={true}
                showDropDownButton={false}
                labelMode='static'>
                <DropDownOptionsTagBox
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </TagBox>
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}


MultiOptionSelector.defaultProps = {
    showSelectionControls: false
}
