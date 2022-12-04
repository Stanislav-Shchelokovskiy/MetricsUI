import React from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'

export default function OptionSelector<dataSourceT, valueExprT>(
    {
        className,
        displayExpr,
        valueExpr,
        placeholder,
        label,
        dataSource,
        selectedValue,
        onValueChange,
    }: {
        className: string
        displayExpr: string
        valueExpr: string
        placeholder: string
        label: string
        dataSource: Array<dataSourceT>
        selectedValue: valueExprT
        onValueChange: (value: valueExprT) => void
    }) {
    return <SelectBox
        className={className}
        displayExpr={displayExpr}
        valueExpr={valueExpr}
        placeholder={placeholder}
        label={label}
        dataSource={dataSource}
        defaultValue={selectedValue}
        onValueChange={onValueChange}
        labelMode='static'>
        <DropDownOptions
            hideOnOutsideClick={true}
            hideOnParentScroll={true} />
    </SelectBox >
}

OptionSelector.defaultProps = {
    displayExpr: undefined,
    valueExpr: undefined,
    placeholder: undefined,
}
