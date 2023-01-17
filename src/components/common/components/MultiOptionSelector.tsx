import React, { useCallback, useMemo } from 'react'
import TagBox, { DropDownOptions, Button } from 'devextreme-react/tag-box'
import DataSource from 'devextreme/data/data_source'
import { trigger } from 'devextreme/events'
import LoadIndicator from './LoadIndicator'
import useDataSource, { DataSourceProps } from '../../common/hooks/UseDataSource'
import { useDispatch } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import { validateValues } from './Utils'
import * as includeIcon from './assets/include.svg'
import * as excludeIcon from './assets/exclude.svg'
import CustomStore from 'devextreme/data/custom_store'
import { LoadOptions } from 'devextreme/data'
import useValidateValues, { ValidateProps } from '../hooks/UseValidateValues'


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
}


export default function MultiOptionSelector<DataSourceT, ValueExprT>(props: Props<DataSourceT, ValueExprT>) {
    const dispatch = useDispatch()
    const onDataSourceFetch = (dataSource: Array<DataSourceT>) => {
        if (props.value === undefined)
            return
        const [validValues, valuesAreValid] = validateValues(dataSource, props.value, props.valueExpr)
        if (valuesAreValid)
            return
        dispatch(props.onValueChange(dataSource, validValues))
    }
    const dataSource = useDataSource(props.dataSource, props.fetchDataSource, props.fetchArgs, onDataSourceFetch)

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

export function SearchMultioptionSelector<DataSourceT, ValueExprT>(props: SearchProps<DataSourceT, ValueExprT>) {

    const dispatch = useDispatch()
    const onValidValuesFetch = (values: Array<ValueExprT>) => {
        if (props.value === undefined)
            return
        const [validValues, valuesAreValid] = validateValues(values, props.value)
        if (valuesAreValid)
            return
        dispatch(props.onValueChange([], validValues))
    }

    useValidateValues(props.fetchValidValues, props.fetchValidValuesArgs, onValidValuesFetch)

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
    }), [props.fetchArgs])
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
    const onIncludeChangeHandler = (include: boolean) => {
        if (props.onIncludeChange !== undefined) {
            dispatch(props.onIncludeChange(include))
        }
    }
    const pageSize = 20

    const ds = new DataSource({
        store: props.dataStore || props.dataSource,
        paginate: true,
        pageSize: pageSize
    });

    const clearButtonOptions = {
        text: '',
        stylingMode: 'text',
        icon: 'clear',
        type: 'danger',
    }

    const wrapperAttr = useMemo(() => { return { id: 'MultiOptionSelectorPopup', class: 'MultiOptionSelectorPopup' } }, [])
    const acceptSelectedValuesOnEndKey = useCallback((e: any) => {
        if (e.event.code === 'End') {
            const element = document.querySelector(`#${wrapperAttr.id} .dx-toolbar [aria-label='OK']`)
            if (element)
                trigger(element, 'dxclick')
        }
    }, [wrapperAttr])

    return <TagBox
        {...props}
        dataSource={ds}
        onValueChange={onValueChangeHandler}
        multiline={true}
        searchEnabled={true}
        showDropDownButton={false}
        selectAllMode='page'
        maxDisplayedTags={pageSize}
        showMultiTagOnly={false}
        applyValueMode='useButtons'
        showClearButton={true}
        labelMode='static'
        onKeyDown={acceptSelectedValuesOnEndKey}
    >
        < DropDownOptions
            hideOnOutsideClick={true}
            hideOnParentScroll={true}
            container={props.container}
            wrapperAttr={wrapperAttr}
        />
        {props.includeButtonState !== undefined ? IncludeButton(props.includeButtonState, onIncludeChangeHandler) : null}
        <Button
            name='clear'
            location='after'
            options={clearButtonOptions} />
    </TagBox >
}


function IncludeButton(isInIncludeState: boolean, onIncludeChange: ((include: boolean) => void)) {
    const buttonOptions = {
        text: '',
        stylingMode: 'text',
        type: isInIncludeState ? 'success' : 'danger',
        icon: isInIncludeState ? includeIcon.default : excludeIcon.default,
        onClick: (e: any) => {
            if (e.component.option('type') === 'danger') {
                e.component.option('type', 'success')
                e.component.option('icon', includeIcon.default)
                onIncludeChange?.(true)
            } else {
                e.component.option('type', 'danger')
                e.component.option('icon', excludeIcon.default)
                onIncludeChange?.(false)
            }
        }
    }
    return <Button
        name='include'
        location='before'
        options={buttonOptions}
    />
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
}

MultiOptionSelector.defaultProps = defaultProps
SearchMultioptionSelector.defaultProps = defaultProps
