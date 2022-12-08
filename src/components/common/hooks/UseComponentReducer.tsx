import React, { useReducer } from 'react'
import { PayloadAction, AnyAction } from '@reduxjs/toolkit'

interface State {
    dataSource: Array<any>
    defaultValue: any
}

const CHANGE_DATA_SOURCE = 'change_data_source'
export const changeDataSource = (dataSource: any): PayloadAction<string, any> => {
    return {
        type: CHANGE_DATA_SOURCE,
        payload: dataSource
    }
}

const CHANGE_DEFAULT_VALUE = 'change_default_value'
export const changeDefaultValue = (value: any): PayloadAction<string, any> => {
    return {
        type: CHANGE_DEFAULT_VALUE,
        payload: value
    }
}

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

export default function useComponentReducer(dataSource: any, defaultValue: any) {
    return useReducer(stateReducer, { dataSource: dataSource, defaultValue: defaultValue })
}
