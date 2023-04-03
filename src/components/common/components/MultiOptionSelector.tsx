import React, { useCallback, useMemo, useRef } from 'react'
import TagBox, { DropDownOptions, Button } from 'devextreme-react/tag-box'
import DataSource from 'devextreme/data/data_source'
import { trigger } from 'devextreme/events'
import LoadIndicator from './LoadIndicator'
import useDataSource, { DataSourceProps } from '../../common/hooks/UseDataSource'
import { useDispatch } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import CustomStore from 'devextreme/data/custom_store'
import { LoadOptions } from 'devextreme/data'
import useServerValidate, { ValidateProps, useValidate } from '../hooks/UseValidate'
import { getIncludeButtonOptions, getClearButtonOptions, ButtonOptions } from './Button'

interface Props<DataSourceT, ValueExprT> extends DataSourceProps<DataSourceT> {
    className: string
    displayExpr: string
    valueExpr: string
    placeholder: string
    label: string
    hideIfDataSourceEmpty: boolean
    value: Array<ValueExprT> | undefined
    onValueChange: (allValues: Array<DataSourceT>, selectedValues: Array<ValueExprT>) => PayloadAction<any>
    showSelectionControls: boolean
    container: string
    disabled: boolean
    includeButtonState: boolean | undefined
    onIncludeChange: ((include: boolean) => PayloadAction<any>) | undefined
    hideSelectedItems: boolean
    dataStore: CustomStore
    openOnFieldClick: boolean
    applyValueMode: 'instantly' | 'useButtons'
    customButtons: Array<ButtonOptions> | undefined
    defaultValue: Array<ValueExprT> | undefined
    displayNullItem: boolean
}

const IS_NULL_FILTER_VALUE = {
    value: '#_NULL_FILTER_VALUE_#',
    displayValue: 'NULL'
}


export default function MultiOptionSelector<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT>(props: Props<DataSourceT, ValueExprT>) {
    const addNullItemToDS = useCallback((ds: any): Array<any> => {
        if (!props.displayNullItem || ds === undefined || (ds as Array<any>).length === 0)
            return ds
        return [{ [props.valueExpr]: IS_NULL_FILTER_VALUE.value, [props.displayExpr]: IS_NULL_FILTER_VALUE.displayValue }, ...ds]
    }, [])

    const validateSelectedValues = useValidate<DataSourceT, ValueExprT>(props.value, props.onValueChange, props.valueExpr)
    const dataSource = useDataSource(props.dataSource, props.fetchDataSource, props.fetchArgs, validateSelectedValues, addNullItemToDS)

    if (dataSource.length > 0) {
        return (
            <MultiOptionSelectorInner
                {...props}
                dataSource={dataSource}
            />
        )
    }
    if (props.hideIfDataSourceEmpty)
        return null
    return <LoadIndicator width={undefined} height={25} />
}


type SearchProps<DataSourceT, ValueExprT> = Props<DataSourceT, ValueExprT> & ValidateProps

export function SearchMultioptionSelector<DataSourceT, ValueExprT = DataSourceT | keyof DataSourceT>(props: SearchProps<DataSourceT, ValueExprT>) {
    useServerValidate(props.fetchValidValues, props.fetchValidValuesArgs, props.value, props.onValueChange)

    const dataStore = useMemo(() => new CustomStore({
        key: props.valueExpr,
        loadMode: 'processed',
        load: (loadOptions: LoadOptions) => {
            if (props.fetchDataSource === undefined)
                return []
            const filter_values = []
            if (loadOptions.filter !== undefined && loadOptions.filter !== null) {
                const filter_descriptor = loadOptions.filter[0]
                if (typeof (filter_descriptor) === 'string' && filter_descriptor !== '!') {
                    filter_values.push(loadOptions.filter[2])
                } else {
                    for (const filter of loadOptions.filter) {
                        if (Array.isArray(filter) && filter[0] !== '!')
                            filter_values.push(filter[2])
                    }
                }
            }
            return props.fetchDataSource(...props.fetchArgs, filter_values, loadOptions.searchValue, loadOptions.skip, loadOptions.take)
        },
    }), [...props.fetchArgs])
    return (
        <MultiOptionSelectorInner
            {...props}
            openOnFieldClick={false}
            dataStore={dataStore}
        />
    )
}


function MultiOptionSelectorInner<DataSourceT, ValueExprT>(props: Props<DataSourceT, ValueExprT>) {
    const dispatch = useDispatch()
    const onValueChangeHandler = (values: Array<ValueExprT>) => {
        dispatch(props.onValueChange(props.dataSource || [], values))
    }
    const onIncludeChangeHandler = useCallback((include: boolean) => {
        if (props.onIncludeChange !== undefined) {
            dispatch(props.onIncludeChange(include))
        }
    }, [])

    const pageSize = 20

    const ds = new DataSource({
        store: props.dataStore || props.dataSource,
        paginate: true,
        pageSize: pageSize,
    });

    const includeButtonOptions = useMemo(() => getIncludeButtonOptions(
        props.includeButtonState === undefined ? true : props.includeButtonState,
        onIncludeChangeHandler,
    ), [props.includeButtonState])

    const tagBoxRef = useRef<TagBox>(null)
    const clearButtonOptions = useMemo(() => {
        return {
            ...getClearButtonOptions(),
            onClick: (e: any) => {
                tagBoxRef.current?.instance.option('value', props.defaultValue)
            }
        }
    }, [props.defaultValue])

    const wrapperAttr = useMemo(() => { return { id: 'MultiOptionSelectorPopup', class: 'MultiOptionSelectorPopup' } }, [])
    const acceptSelectedValuesOnEndKey = useCallback((e: any) => {
        if (e.event.code === 'End') {
            const element = document.querySelector(`#${wrapperAttr.id} .dx-toolbar [aria-label='OK']`)
            if (element)
                trigger(element, 'dxclick')
        }
    }, [wrapperAttr])

    const renderTag = useCallback((tag: any) => {
        const keySelector = props.displayExpr === undefined ?
            (x: keyof DataSourceT) => (x as unknown) as string :
            (x: DataSourceT) => (x[props.displayExpr as keyof DataSourceT] as unknown) as string
        return <div className='dx-tag-content'>
            {keySelector(tag)}
            {defaultValueIsSelected(props.value, props.defaultValue) ? null : <div className='dx-tag-remove-button'></div>}
        </div>
    }, [props.defaultValue, props.value])

    return <TagBox
        {...props}
        ref={tagBoxRef}
        dataSource={ds}
        onValueChange={onValueChangeHandler}
        multiline={true}
        searchEnabled={true}
        showDropDownButton={false}
        selectAllMode='page'
        tagRender={renderTag}
        maxDisplayedTags={pageSize}
        showMultiTagOnly={false}
        showClearButton={false}
        labelMode='static'
        onKeyDown={acceptSelectedValuesOnEndKey}
    >
        < DropDownOptions
            hideOnOutsideClick={true}
            hideOnParentScroll={true}
            container={props.container}
            wrapperAttr={wrapperAttr}
        />
        {
            props.includeButtonState !== undefined ?
                <Button
                    name={includeButtonOptions.name}
                    location={includeButtonOptions.location}
                    options={includeButtonOptions} />
                : null
        }
        {
            props.customButtons !== undefined ?
                props.customButtons.map(o => <Button
                    key={o.name}
                    name={o.name}
                    location={o.location}
                    options={o} />) :
                null
        }
        {!defaultValueIsSelected(props.value, props.defaultValue) ?
            <Button
                name='customclear'
                location='after'
                options={clearButtonOptions} /> :
            null}
    </TagBox >
}


function defaultValueIsSelected<ValueExprT>(value: Array<ValueExprT> | undefined, defaultValue: Array<ValueExprT> | undefined) {
    return JSON.stringify(value) === JSON.stringify(defaultValue) || value?.length === 0
}


const defaultProps = {
    displayExpr: undefined,
    valueExpr: undefined,
    onIncludeChange: undefined,
    includeButtonState: undefined,
    dataSource: [],
    fetchDataSource: undefined,
    fetchArgs: [],
    hideIfDataSourceEmpty: false,
    disabled: false,
    showSelectionControls: true,
    container: undefined,
    hideSelectedItems: true,
    dataStore: undefined,
    openOnFieldClick: true,
    applyValueMode: 'useButtons',
    customButtons: undefined,
    defaultValue: undefined,
    displayNullItem: true,
}

MultiOptionSelector.defaultProps = defaultProps
SearchMultioptionSelector.defaultProps = defaultProps
