import React, { useMemo } from 'react'
import SelectBox, { DropDownOptions, Button } from 'devextreme-react/select-box'
import DataSource from 'devextreme/data/data_source'
import LoadIndicator from './LoadIndicator'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import useDataSource, { DataSourceProps } from '../../common/hooks/UseDataSource'
import { useSingleValidate } from '../hooks/UseValidate'
import { getClearButtonOptions, ButtonOptions } from './Button'


interface Props<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT> extends DataSourceProps<DataSourceT> {
    className: string | undefined
    displayExpr: string
    valueExpr: string
    groupExpr: string,
    placeholder: string
    label: string
    container: string
    valueSelector: (store: any) => ValueExprT | undefined
    defaultValueSelector: (dataSource: Array<DataSourceT>) => ValueExprT
    onValueChange: (value: ValueExprT | undefined) => PayloadAction<any>
    onValueChangeEx: ((dsValue: DataSourceT) => void) | undefined
    showDropDownButton: boolean
    showClear: boolean
    customButtons: Array<ButtonOptions> | undefined
    hideIfEmpty: boolean
}


export default function OptionSelector<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT>(props: Props<DataSourceT, ValueExprT>) {
    const dispatch = useDispatch()
    const onValueChangeHandler = (value: ValueExprT) => {
        if (props.onValueChangeEx) {
            const keySelector = props.valueExpr === undefined ?
                (x: keyof DataSourceT) => (x as unknown) as ValueExprT :
                (x: DataSourceT) => (x[props.valueExpr as keyof DataSourceT] as unknown) as ValueExprT
            const dsValue = (dataSource as Array<any>).find(x => keySelector(x) === value)
            props.onValueChangeEx(dsValue)
        }
        dispatch(props.onValueChange(value))
    }

    const value = useSelector(props.valueSelector)
    const validateSelectedValue = useSingleValidate<DataSourceT, ValueExprT>(value, props.onValueChange, props.valueExpr, props.defaultValueSelector)
    const dataSource = useDataSource(props.dataSource, props.fetchDataSource, props.fetchArgs, validateSelectedValue)

    const ds = new DataSource({
        store: dataSource,
        paginate: true,
        pageSize: 20,
        group: props.groupExpr,
    })

    const defaultValue = useMemo(() => props.defaultValueSelector?.(dataSource), [dataSource])
    const clearButtonOptions = useMemo(() => {
        return {
            ...getClearButtonOptions(),
            onClick: (e: any) => {
                onValueChangeHandler(defaultValue)
            }
        }
    }, [defaultValue])

    if (dataSource.length > 0) {
        return <SelectBox
            {...props}
            dataSource={ds}
            grouped={props.groupExpr !== undefined}
            value={value}
            onValueChange={onValueChangeHandler}
            labelMode='static'
            focusStateEnabled={false}>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true}
                focusStateEnabled={false}
                container={props.container} />
            {
                props.customButtons !== undefined ?
                    props.customButtons.map(o => <Button
                        key={o.name}
                        name={o.name}
                        location={o.location}
                        options={o} />) :
                    null
            }
            <Button name='dropDown' />
            {props.showClear && !defaultValueIsSelected(value, defaultValue) ?
                <Button
                    name='customclear'
                    location='after'
                    options={clearButtonOptions} /> :
                null}
        </SelectBox >
    }
    if (props.hideIfEmpty)
        return null
    return <LoadIndicator width={undefined} height={25} />
}

function defaultValueIsSelected<ValueExprT>(value: ValueExprT | undefined, defaultValue: ValueExprT | undefined) {
    return value === defaultValue || value === undefined
}

const defaultProps = {
    className: 'OptionSelector',
    displayExpr: undefined,
    valueExpr: undefined,
    groupExpr: undefined,
    placeholder: undefined,
    container: undefined,
    defaultValueSelector: undefined,
    dataSource: [],
    fetchDataSource: undefined,
    fetchArgs: [],
    showDropDownButton: true,
    showClearButton: false,
    showClear: false,
    onValueChangeEx: undefined,
    customButtons: undefined,
    hideIfEmpty: false,
}

OptionSelector.defaultProps = defaultProps
