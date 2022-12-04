import React from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from './LoadIndicator'
import useDataSource from '../../common/hooks/UseDataSource'
import useMultiSelectValueDispatch from '../../common/hooks/UseMultiSelectValueDispatch'
import useSelectedValues from '../../common/hooks/UseSelectedValues'
import FetchResult from '../Interfaces'
import { AppStore } from '../AppStore'
import { PayloadAction } from '@reduxjs/toolkit'
import { Payload } from '../Interfaces'


export default function MultiOptionSelector<DataSourceT, ValueExprT>(
    {
        className,
        displayExpr,
        valueExpr,
        placeholder,
        label,
        fetchDataSourceValues,
        stateSelector,
        dataSourceObjectKeySelector,
        dataSourceObjectByKeySelector,
        onValueChange,
        showSelectionControls,
    }: {
        className: string
        displayExpr: string
        valueExpr: string
        placeholder: string
        label: string
        fetchDataSourceValues: () => Promise<FetchResult<Array<DataSourceT>>>
        stateSelector: (store: AppStore) => Array<DataSourceT>
        dataSourceObjectKeySelector: (value: DataSourceT) => ValueExprT
        dataSourceObjectByKeySelector: (value: DataSourceT, targetKeyValue: ValueExprT) => boolean
        onValueChange: (values: Array<DataSourceT>) => PayloadAction<Payload<string, Array<DataSourceT>>>
        showSelectionControls: boolean
    }) {

    const values = useDataSource<DataSourceT>(fetchDataSourceValues)

    const selectedValues = useSelectedValues<DataSourceT, ValueExprT>(
        stateSelector,
        dataSourceObjectKeySelector
    )

    const onValueChangeHandler = useMultiSelectValueDispatch<DataSourceT, ValueExprT>(
        onValueChange,
        values,
        dataSourceObjectByKeySelector)

    if (values.length > 0) {
        return (
            <TagBox
                className={className}
                displayExpr={displayExpr}
                valueExpr={valueExpr}
                placeholder={placeholder}
                label={label}
                dataSource={values}
                defaultValue={selectedValues}
                onValueChange={onValueChangeHandler}
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
