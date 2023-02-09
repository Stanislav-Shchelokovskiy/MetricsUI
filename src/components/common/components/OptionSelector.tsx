import React, { useRef } from 'react'
import SelectBox, { DropDownOptions, Button } from 'devextreme-react/select-box'
import LoadIndicator from './LoadIndicator'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import useDataSource, { DataSourceProps } from '../../common/hooks/UseDataSource'

interface Props<DataSourceT, ValueExprT> extends DataSourceProps<DataSourceT> {
    className: string
    displayExpr: string
    valueExpr: string
    placeholder: string
    label: string
    container: string
    valueSelector: (store: any) => ValueExprT | undefined
    defaultValueSelector: (value: Array<DataSourceT>) => ValueExprT
    onValueChange: (value: ValueExprT) => PayloadAction<any>
    showDropDownButton: boolean
    showClearButton: boolean
}


export default function OptionSelector<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT>(props: Props<DataSourceT, ValueExprT>) {
    const appDispatch = useDispatch()
    const onValueChangeHandler = (value: ValueExprT) => {
        appDispatch(props.onValueChange(value))
    }

    const value = useRef<ValueExprT>()
    value.current = useSelector(props.valueSelector)
    const onDataSourceFetch = (allValidValues: Array<DataSourceT> | Array<keyof DataSourceT>, dataSource: Array<DataSourceT>) => {
        if (isEmpty(value.current) && props.defaultValueSelector !== undefined) {
            const defaultValue = props.defaultValueSelector(dataSource)
            onValueChangeHandler(defaultValue)
        }
    }
    const dataSource = useDataSource(props.dataSource, props.fetchDataSource, props.fetchArgs, onDataSourceFetch)

    if (dataSource.length > 0) {
        return <SelectBox
            {...props}
            dataSource={dataSource}
            value={value.current}
            onValueChange={onValueChangeHandler}
            labelMode='static'
            focusStateEnabled={false}>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true}
                focusStateEnabled={false}
                container={props.container}
            />
        </SelectBox >
    }
    return <LoadIndicator width={undefined} height={25} />
}

const defaultProps = {
    displayExpr: undefined,
    valueExpr: undefined,
    placeholder: undefined,
    container: undefined,
    defaultValueSelector: undefined,
    dataSource: [],
    fetchDataSource: undefined,
    fetchArgs: [],
    customButtons: undefined,
    showDropDownButton: true,
    showClearButton: false,
}

OptionSelector.defaultProps = defaultProps


function isEmpty<ValueExprT>(value: ValueExprT | undefined) {
    return value === undefined || String(value).length === 0
}
