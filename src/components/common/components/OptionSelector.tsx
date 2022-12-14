import React, { useEffect } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from './LoadIndicator'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import FetchResult from '../Interfaces'
import useComponentReducer, { changeDataSource, changeDefaultValue } from '../hooks/UseComponentReducer'


interface BaseProps {
    className: string
    displayExpr: string
    valueExpr: string
    placeholder: string
    label: string
    container: string
}

interface DataSourceProps<DataSourceT, ValueExprT> extends BaseProps {
    dataSource: Array<DataSourceT>
    defaultValue: ValueExprT
    onValueChange: (value: ValueExprT) => void
}

interface FetchProps<DataSourceT, ValueExprT> extends BaseProps {
    fetchDataSourceValues: () => Promise<FetchResult<Array<DataSourceT>>>
    stateSelector: (store: any) => ValueExprT | undefined
    defaultValueSelector: (value: Array<DataSourceT>) => ValueExprT
    onValueChange: (value: ValueExprT) => PayloadAction<any>
}

export default function OptionSelectorWithFetch<DataSourceT, ValueExprT>(props: FetchProps<DataSourceT, ValueExprT>) {
    const storedDefaultValue = useSelector(props.stateSelector)
    const [state, componentDispatch] = useComponentReducer([], storedDefaultValue)
    const appDispatch = useDispatch()
    const onValueChangeHandler = (value: ValueExprT) => {
        appDispatch(props.onValueChange(value))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<DataSourceT>> = await props.fetchDataSourceValues()
            if (fetchResult.success) {
                componentDispatch(changeDataSource(fetchResult.data))

                const defaultValue = storedDefaultValue || props.defaultValueSelector(fetchResult.data)
                componentDispatch(changeDefaultValue(defaultValue))
                appDispatch(props.onValueChange(defaultValue))
            }
        })()
    }, [])

    if (state.dataSource.length > 0) {
        return <OptionSelector
            {...props}
            dataSource={state.dataSource}
            defaultValue={state.defaultValue}
            onValueChange={onValueChangeHandler} />
    }
    return <LoadIndicator width={undefined} height={25} />
}

export function OptionSelector<DataSourceT, ValueExprT>(props: DataSourceProps<DataSourceT, ValueExprT>) {
    return <SelectBox
        {...props}
        labelMode='static'
        focusStateEnabled={false}>
        <DropDownOptions
            hideOnOutsideClick={true}
            hideOnParentScroll={true}
            focusStateEnabled={false}
            container={props.container} />
    </SelectBox >
}

const defaultProps = {
    displayExpr: undefined,
    valueExpr: undefined,
    placeholder: undefined,
    container: undefined,
}

OptionSelectorWithFetch.defaultProps = defaultProps
OptionSelector.defaultProps = defaultProps
