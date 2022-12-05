import React from 'react'
import TagBox, { DropDownOptions as DropDownOptionsTagBox } from 'devextreme-react/tag-box'
import LoadIndicator from './LoadIndicator'
import useDataSource from '../../common/hooks/UseDataSource'
import FetchResult from '../Interfaces'
import { AppStore, useAppSelector, useAppDispatch } from '../AppStore'
import { PayloadAction } from '@reduxjs/toolkit'


export default function MultiOptionSelector<DataSourceT, ValueExprT>(
    {
        className,
        displayExpr,
        valueExpr,
        placeholder,
        label,
        fetchDataSourceValues,
        stateSelector,
        onValueChange,
        showSelectionControls,
    }: {
        className: string
        displayExpr: string
        valueExpr: string
        placeholder: string
        label: string
        fetchDataSourceValues: () => Promise<FetchResult<Array<DataSourceT>>>
        stateSelector: (store: AppStore) => Array<ValueExprT>
        onValueChange: (allValues: Array<DataSourceT>, selectedValues: Array<ValueExprT>) => PayloadAction<any>
        showSelectionControls: boolean
    }) {

    const dataSource = useDataSource<DataSourceT>(fetchDataSourceValues)

    const selectedValues = useAppSelector(stateSelector)

    const dispatch = useAppDispatch()
    const onValueChangeHandler = (values: Array<ValueExprT>) => {
        dispatch(onValueChange(dataSource, values))
    }

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
