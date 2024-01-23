import React, { useMemo, FC, useState, useRef } from 'react'
import SelectBox, { DropDownOptions, Button } from 'devextreme-react/select-box'
import DataSource from 'devextreme/data/data_source'
import LoadIndicator from './LoadIndicator'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import useDataSource, { DataSourceProps } from '../../common/hooks/UseDataSource'
import { useSingleValidate } from '../hooks/UseValidate'
import { getClearButtonOptions, ButtonOptions } from './Button'
import { PopupProps, Undefinable } from '../Typing'


interface Props<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT> extends DataSourceProps<DataSourceT> {
    className: Undefinable<string>
    displayExpr: string
    valueExpr: string
    groupExpr: string,
    sortExpr: string,
    filterExpr: string,
    placeholder: string
    label: string
    container: string
    valueSelector: (store: any) => Undefinable<ValueExprT>
    defaultValueSelector: (dataSource: Array<DataSourceT>) => ValueExprT
    onValueChange: (value: Undefinable<ValueExprT>) => PayloadAction<any>
    onValueChangeEx: Undefinable<(dsValue: DataSourceT) => void>
    showDropDownButton: boolean
    showClear: boolean
    customButtons: Undefinable<Array<ButtonOptions>>
    hideIfEmpty: boolean
    customPopup: Undefinable<FC<CustomPopupProps<DataSourceT, ValueExprT>>>
    filteredPopupButtonOptions: ButtonOptions
    filter: Undefinable<Array<any>>
}

export interface CustomPopupProps<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT> extends PopupProps {
    dataSource: DataSource<DataSourceT, ValueExprT>
    value: ValueExprT
    dispatchValue: (value: ValueExprT) => void
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

    const ds = useMemo(() => new DataSource<DataSourceT, ValueExprT>({
        store: dataSource,
        paginate: props.customPopup == null,
        pageSize: 20,
        group: props.groupExpr,
        sort: props.sortExpr,
    }), [dataSource])

    const defaultValue = useMemo(() => props.defaultValueSelector?.(dataSource), [dataSource])
    const clearButtonOptions = useMemo(() => {
        return {
            ...getClearButtonOptions(),
            onClick: (e: any) => {
                onValueChangeHandler(defaultValue)
            }
        }
    }, [defaultValue])


    const ref = useRef<SelectBox>(null)
    const [customPopupVisible, showCustomPopup] = useState(false)
    const showOriginalPopup = useRef<boolean>(!props.customPopup)

    function onPopupShowing(e: any) {
        if (showOriginalPopup.current) {
            showOriginalPopup.current = false
            return
        }
        e.cancel = true

        ds.filter(null)
        showCustomPopup(true)
    }

    function hideCustomPopup() {
        ref.current?.instance.close()
        showCustomPopup(false)
    }

    function showFilteredPopup() {
        if (props.filterExpr) {
            const newFilter: Array<any> = [[props.valueExpr, '=', value]]
            if (props.filter)
                for (const filterVal of props.filter) {
                    newFilter.push('or')
                    newFilter.push([props.filterExpr, '=', filterVal])
                }
            ds.filter(newFilter)
            ds.load()
        }
        showOriginalPopup.current = true
        ref.current?.instance.open()
    }

    const filteredPopupButtonOptions = props.filteredPopupButtonOptions ? {
        ...props.filteredPopupButtonOptions,
        onClick: showFilteredPopup,
    } : null


    if (dataSource.length > 0) {
        return <>
            <SelectBox
                {...props}
                ref={ref}
                dataSource={ds}
                grouped={props.groupExpr !== undefined}
                value={value}
                onValueChange={onValueChangeHandler}
                labelMode='static'
                stylingMode='filled'
                showDropDownButton={false}
                focusStateEnabled={false}>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true}
                    focusStateEnabled={false}
                    onShowing={props.customPopup ? onPopupShowing : undefined}
                    container={props.container} />
                {
                    props.customButtons !== undefined ?
                        props.customButtons.map(o => <Button
                            key={o.name}
                            name={o.name}
                            location={o.location}
                            options={o as any} />) :
                        null
                }
                <Button name='dropDown' />
                {filteredPopupButtonOptions ?
                    <Button
                        name={filteredPopupButtonOptions.name}
                        location={filteredPopupButtonOptions.location}
                        options={filteredPopupButtonOptions as any} /> :
                    null}

                {props.showClear && !defaultValueIsSelected(value, defaultValue) ?
                    <Button
                        name={clearButtonOptions.name}
                        location={clearButtonOptions.location}
                        options={clearButtonOptions} /> :
                    null}
            </SelectBox >
            {props.customPopup ?
                <props.customPopup
                    dataSource={ds}
                    value={value as ValueExprT}
                    dispatchValue={onValueChangeHandler}
                    visible={customPopupVisible}
                    onHiding={hideCustomPopup}
                /> : null}
        </>
    }
    if (props.hideIfEmpty)
        return null
    return <LoadIndicator />
}

function defaultValueIsSelected<ValueExprT>(value: ValueExprT | undefined, defaultValue: ValueExprT | undefined) {
    return value === defaultValue || value === undefined
}

const defaultProps = {
    className: 'OptionSelector',
    displayExpr: undefined,
    valueExpr: undefined,
    groupExpr: undefined,
    sortExpr: undefined,
    filterExpr: undefined,
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
    customPopup: null,
    filteredPopupButtonOptions: null,
    filter: null,
}

OptionSelector.defaultProps = defaultProps
