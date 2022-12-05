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


export default function OptionSelector<DataSourceT, ValueExprT>(
    {
        className,
        displayExpr,
        valueExpr,
        placeholder,
        label,
        fetchDataSourceValues,
        stateSelector,
        defaultValueSelector,
        onValueChange,
    }: {
        className: string
        displayExpr: string
        valueExpr: string
        placeholder: string
        label: string
        fetchDataSourceValues: () => Promise<FetchResult<Array<DataSourceT>>>
        stateSelector: (store: AppStore) => ValueExprT | undefined
        defaultValueSelector: (values: Array<DataSourceT>) => ValueExprT
        onValueChange: (value: ValueExprT) => PayloadAction<any>
    }) {

    const storedDefaultValue = useAppSelector(stateSelector)
    const [state, componentDispatch] = useReducer(stateReducer, { dataSource: [], defaultValue: storedDefaultValue })
    const appDispatch = useAppDispatch()
    const onValueChangeHandler = (value: ValueExprT) => {
        appDispatch(onValueChange(value))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<DataSourceT>> = await fetchDataSourceValues()
            if (fetchResult.success) {
                componentDispatch({ type: CHANGE_DATA_SOURCE, payload: fetchResult.data })

                const defaultValue = storedDefaultValue || defaultValueSelector(fetchResult.data)
                componentDispatch({ type: CHANGE_DEFAULT_VALUE, payload: defaultValue })
                console.log(defaultValue)
                appDispatch(onValueChange(defaultValue))
            }
        })()
    }, [])

    if (state.dataSource.length > 0) {
        return <SelectBox
            className={className}
            displayExpr={displayExpr}
            valueExpr={valueExpr}
            placeholder={placeholder}
            label={label}
            dataSource={state.dataSource}
            defaultValue={state.defaultValue}
            onValueChange={onValueChangeHandler}
            labelMode='static'>
            <DropDownOptions
                hideOnOutsideClick={true}
                hideOnParentScroll={true} />
        </SelectBox >
    }
    return <LoadIndicator width={undefined} height={25} />
}

OptionSelector.defaultProps = {
    displayExpr: undefined,
    valueExpr: undefined,
    placeholder: undefined,
}
