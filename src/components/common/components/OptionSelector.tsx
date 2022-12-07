import React, { useEffect, useReducer } from 'react'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from './LoadIndicator'
import { PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { AppStore, useAppSelector, useAppDispatch } from '../AppStore'
import FetchResult from '../Interfaces'

interface State {
    dataSource: Array<any>
    defaultValue: any
}

const CHANGE_DATA_SOURCE = 'change_data_source'
const CHANGE_DEFAULT_VALUE = 'change_default_value'

function stateReducer(state: State, action: AnyAction): State {
    switch (action.type) {
        case CHANGE_DATA_SOURCE:
            return {
                ...state,
                dataSource: action.payload
            }
        case CHANGE_DEFAULT_VALUE:
            return {
                ...state,
                defaultValue: action.payload
            }
        default:
            return state
    }
}

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
    stateSelector: (store: AppStore) => ValueExprT | undefined
    defaultValueSelector: (value: Array<DataSourceT>) => ValueExprT
    onValueChange: (value: ValueExprT) => PayloadAction<any>
}

export default function OptionSelectorWithFetch<DataSourceT, ValueExprT>(props: FetchProps<DataSourceT, ValueExprT>) {

    const storedDefaultValue = useAppSelector(props.stateSelector)
    const [state, componentDispatch] = useReducer(stateReducer, { dataSource: [], defaultValue: storedDefaultValue })
    const appDispatch = useAppDispatch()
    const onValueChangeHandler = (value: ValueExprT) => {
        appDispatch(props.onValueChange(value))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<DataSourceT>> = await props.fetchDataSourceValues()
            if (fetchResult.success) {
                componentDispatch({ type: CHANGE_DATA_SOURCE, payload: fetchResult.data })

                const defaultValue = storedDefaultValue || props.defaultValueSelector(fetchResult.data)
                componentDispatch({ type: CHANGE_DEFAULT_VALUE, payload: defaultValue })
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
        labelMode='static'>
        <DropDownOptions
            hideOnOutsideClick={true}
            hideOnParentScroll={true}
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
