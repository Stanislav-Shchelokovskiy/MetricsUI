import React from 'react'
import TagBox, { DropDownOptions, Button } from 'devextreme-react/tag-box'
import LoadIndicator from './LoadIndicator'
import useDataSource from '../../common/hooks/UseDataSource'
import FetchResult from '../Interfaces'
import { AppStore, useAppSelector, useAppDispatch } from '../AppStore'
import { PayloadAction } from '@reduxjs/toolkit'
import * as includeIcon from './assets/include.svg'
import * as excludeIcon from './assets/exclude.svg'


interface BaseProps<DataSourceT, ValueExprT> {
    className: string
    displayExpr: string
    valueExpr: string
    placeholder: string
    label: string
    stateSelector: (store: AppStore) => Array<ValueExprT>
    onValueChange: (allValues: Array<DataSourceT>, selectedValues: Array<ValueExprT>) => PayloadAction<any>
    showSelectionControls: boolean
    container: string
    disabled: boolean
    onIncludeButtonClick: ((include: boolean) => void) | undefined
}

interface DataSourceProps<DataSourceT, ValueExprT> extends BaseProps<DataSourceT, ValueExprT> {
    dataSource: Array<DataSourceT>
}

interface FetchProps<DataSourceT, ValueExprT> extends BaseProps<DataSourceT, ValueExprT> {
    fetchDataSourceValues: () => Promise<FetchResult<Array<DataSourceT>>>
}


export default function MultiOptionSelectorWithFetch<DataSourceT, ValueExprT>(props: FetchProps<DataSourceT, ValueExprT>) {
    const dataSource = useDataSource<DataSourceT>(props.fetchDataSourceValues)

    if (dataSource.length > 0) {
        return (
            <MultiOptionSelector
                {...props}
                dataSource={dataSource}
            />
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}

export function MultiOptionSelector<DataSourceT, ValueExprT>(props: DataSourceProps<DataSourceT, ValueExprT>) {
    const selectedValues = useAppSelector(props.stateSelector)

    const dispatch = useAppDispatch()
    const onValueChangeHandler = (values: Array<ValueExprT>) => {
        dispatch(props.onValueChange(props.dataSource, values))
    }

    return <TagBox
        {...props}
        value={selectedValues}
        onValueChange={onValueChangeHandler}
        multiline={true}
        searchEnabled={true}
        showDropDownButton={false}
        hideSelectedItems={true}
        //grouped={true}
        labelMode='static'>
        < DropDownOptions
            hideOnOutsideClick={true}
            hideOnParentScroll={true}
            container={props.container} />
        {getIncludeButton(props.onIncludeButtonClick)}
    </TagBox >
}

function getIncludeButton(onIncludeButtonClick: ((include: boolean) => void) | undefined) {
    const buttonOptions = {
        text: '',
        stylingMode: 'text',
        type: 'success',
        icon: includeIcon.default,
        onClick: (e: any) => {
            if (e.component.option('type') === 'danger') {
                e.component.option('type', 'success')
                e.component.option('icon', includeIcon.default)
                onIncludeButtonClick?.(true)
            } else {
                e.component.option('type', 'danger')
                e.component.option('icon', excludeIcon.default)
                onIncludeButtonClick?.(false)
            }
        }
    }
    if (onIncludeButtonClick) {
        return <Button
            name=''
            location='before'
            options={buttonOptions}
        />
    }
}

const defaultProps = {
    displayExpr: undefined,
    valueExpr: undefined,
    showSelectionControls: false,
    container: undefined,
    disabled: false,
    onIncludeButtonClick: undefined
}

MultiOptionSelectorWithFetch.defaultProps = defaultProps
MultiOptionSelector.defaultProps = defaultProps
