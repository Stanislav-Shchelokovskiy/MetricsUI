import React, { useEffect, useRef, useState } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from './LoadIndicator'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import FetchResult from '../Interfaces'

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
    defaultValue: ValueExprT | undefined
    onValueChange: (value: ValueExprT) => void
}

interface DataSourceWithValue<DataSourceT, ValueExprT> extends DataSourceProps<DataSourceT, ValueExprT> {
    value: any
}

interface FetchProps<DataSourceT, ValueExprT> extends BaseProps {
    fetchDataSourceValues: () => Promise<FetchResult<Array<DataSourceT>>>
    stateSelector: (store: any) => ValueExprT | undefined
    defaultValueSelector: (value: Array<DataSourceT>) => ValueExprT
    onValueChange: (value: ValueExprT) => PayloadAction<any>
}


export default function OptionSelectorWithFetch<DataSourceT, ValueExprT>(props: FetchProps<DataSourceT, ValueExprT>) {
    const storedDefaultValue = useRef<ValueExprT>()
    storedDefaultValue.current = useSelector(props.stateSelector)

    const [dataSource, setDataSource] = useState<Array<DataSourceT>>([])
    const appDispatch = useDispatch()
    const onValueChangeHandler = (value: ValueExprT) => {
        appDispatch(props.onValueChange(value))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<DataSourceT>> = await props.fetchDataSourceValues()
            if (fetchResult.success) {
                setDataSource(fetchResult.data)
                console.log('useEffect before appDispatch ',storedDefaultValue.current)
                if (storedDefaultValue.current === undefined || String(storedDefaultValue.current).length === 0) {
                    const defaultValue = props.defaultValueSelector(fetchResult.data)
                    appDispatch(props.onValueChange(defaultValue))
                    console.log('appDispatch ',defaultValue)
                }
                console.log('useEffect after appDispatch ',storedDefaultValue.current)
            }
        })()
    }, [])
    console.log('OptionSelectorWithFetch ', storedDefaultValue.current)
    if (dataSource.length > 0) {
        return <OptionSelector<DataSourceT, ValueExprT>
            {...props}
            value={(storedDefaultValue.current as ValueExprT)}
            dataSource={dataSource}
            onValueChange={onValueChangeHandler} />
    }
    return <LoadIndicator width={undefined} height={25} />
}

export function OptionSelector<DataSourceT, ValueExprT>(props: DataSourceProps<DataSourceT, ValueExprT> | DataSourceWithValue<DataSourceT, ValueExprT>) {
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
    defaultValue: undefined,
}

OptionSelectorWithFetch.defaultProps = defaultProps
OptionSelector.defaultProps = defaultProps
