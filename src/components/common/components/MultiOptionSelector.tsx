import React from 'react'
import TagBox, { DropDownOptions, Button } from 'devextreme-react/tag-box'
import DataSource from 'devextreme/data/data_source'
import LoadIndicator from './LoadIndicator'
import useDataSource from '../../common/hooks/UseDataSource'
import FetchResult from '../Interfaces'
import { useDispatch } from 'react-redux'
import { PayloadAction } from '@reduxjs/toolkit'
import * as includeIcon from './assets/include.svg'
import * as excludeIcon from './assets/exclude.svg'


interface Props<DataSourceT, ValueExprT> {
    className: string
    displayExpr: string
    valueExpr: string
    placeholder: string
    label: string
    dataSource: Array<DataSourceT> | undefined
    defaultValue: Array<ValueExprT> | undefined
    onValueChange: (allValues: Array<DataSourceT>, selectedValues: Array<ValueExprT>) => PayloadAction<any>
    showSelectionControls: boolean
    container: string
    disabled: boolean
    includeButtonState: boolean | undefined
    onIncludeChange: ((include: boolean) => PayloadAction<any>) | undefined
    hideSelectedItems: boolean
}

interface PropsWithValue<DataSourceT, ValueExprT> extends Props<DataSourceT, ValueExprT> {
    value: Array<ValueExprT>
}

interface FetchProps<DataSourceT, ValueExprT> extends Props<DataSourceT, ValueExprT> {
    fetchDataSourceValues: () => Promise<FetchResult<Array<DataSourceT>>>
}


export default function MultiOptionSelectorWithFetch<DataSourceT, ValueExprT>(props: FetchProps<DataSourceT, ValueExprT>) {
    const dataSource = useDataSource(props.fetchDataSourceValues)
    if (dataSource.length > 0) {
        return (
            <MultiOptionSelector
                {...props}
                dataSource={dataSource}
                value={props.defaultValue}
            />
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}


export function MultiOptionSelector<DataSourceT, ValueExprT>(props: Props<DataSourceT, ValueExprT> | PropsWithValue<DataSourceT, ValueExprT>) {
    const dispatch = useDispatch()
    const onValueChangeHandler = (values: Array<ValueExprT>) => {
        dispatch(props.onValueChange(props.dataSource || [], values))
    }
    const onIncludeChangeHandler = (include: boolean) => {
        if (props.onIncludeChange !== undefined) {
            dispatch(props.onIncludeChange(include))
        }
    }
    const ds = new DataSource({
        store: props.dataSource,
        paginate: true,
        pageSize: 10
    });

    const clearButtonOptions = {
        text: '',
        stylingMode: 'text',
        icon: 'clear',
        type: 'danger',
    }

    return <TagBox
        {...props}
        dataSource={ds}
        onValueChange={onValueChangeHandler}
        multiline={true}
        searchEnabled={true}
        showDropDownButton={false}
        selectAllMode='page'
        applyValueMode='useButtons'
        showClearButton={true}
        labelMode='static'>
        < DropDownOptions
            hideOnOutsideClick={true}
            hideOnParentScroll={true}
            container={props.container} />
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
    disabled: false,
    showSelectionControls: true,
    container: undefined,
    hideSelectedItems: true,
}

MultiOptionSelectorWithFetch.defaultProps = { ...defaultProps, dataSource: undefined, defaultValue: undefined }
MultiOptionSelector.defaultProps = defaultProps
