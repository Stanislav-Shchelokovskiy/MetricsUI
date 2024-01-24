import React, { useMemo, useState, useEffect } from 'react'
import SelectBox, { DropDownOptions, Button } from 'devextreme-react/select-box'
import DataSource from 'devextreme/data/data_source'
import LoadIndicator from './LoadIndicator'
import { PayloadAction } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import useDataSource, { DataSourceProps } from '../../common/hooks/UseDataSource'
import { useSingleValidate } from '../hooks/UseValidate'
import { getClearButtonOptions, ButtonOptions } from './Button'
import { Undefinable } from '../Typing'


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
    opened: boolean
    paginate: boolean
    onPopupShowing: Undefinable<
        (dataSource: DataSource<DataSourceT, ValueExprT>,
            value: ValueExprT,
            dispatchValue: (value: ValueExprT) => void,
            setFilter: (filter: Array<any> | null) => void,
            cancelDefault: () => void,
            onHiding: () => void) => void
    >
    onPopupHiding: Undefinable<(clearFilter: () => void) => void>
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
        paginate: props.paginate,
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


    const [opened, setOpened] = useState(props.opened)
    useEffect(() => { setOpened(props.opened) }, [props.opened])

    function onPopupShowing(e: any) {
        let opened = true
        function cancel() {
            opened = false
            e.cancel = true
        }
        props.onPopupShowing?.(
            ds,
            value as ValueExprT,
            onValueChangeHandler,
            (filter: Array<any> | null) => {
                ds.filter(filter)
                ds.load()
            },
            cancel,
            onHiding,
        )
        setOpened(opened)
    }

    function onHiding() {
        props.onPopupHiding?.(
            () => {
                const timerId = setTimeout(() => {
                    if (!opened) {
                        ds.filter(null)
                        ds.load()
                    }
                    clearTimeout(timerId)
                }, 300)

            },)
        setOpened(false)
    }

    if (dataSource.length > 0) {
        return <>
            <SelectBox
                {...props}
                dataSource={ds}
                grouped={props.groupExpr !== undefined}
                value={value}
                onValueChange={onValueChangeHandler}
                labelMode='static'
                opened={opened}
                stylingMode='filled'
                showDropDownButton={false}
                focusStateEnabled={false}>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true}
                    focusStateEnabled={false}
                    container={props.container}
                    onShowing={onPopupShowing}
                    onHiding={onHiding}
                />
                {
                    props.customButtons !== undefined ?
                        props.customButtons.map(o => <Button
                            key={o.name}
                            name={o.name}
                            location={o.location}
                            options={o as any} />) :
                        null
                }
                {props.showClear && !defaultValueIsSelected(value, defaultValue) ?
                    <Button
                        name={clearButtonOptions.name}
                        location={clearButtonOptions.location}
                        options={clearButtonOptions} /> :
                    null}
            </SelectBox >
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
    opened: false,
    paginate: true,
    onPopupShowing: undefined,
    onPopupHiding: undefined,
}

OptionSelector.defaultProps = defaultProps
