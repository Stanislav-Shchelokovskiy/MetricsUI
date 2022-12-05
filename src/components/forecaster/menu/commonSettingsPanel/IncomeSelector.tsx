import React, { useReducer, useEffect } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import OptionSelector from '../../../common/components/OptionSelector'
import FetchResult from '../../../common/Interfaces'
import { fetchIncomeTypes } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeIncomeType } from '../../store/Actions'
import { useAppDispatch, useAppSelector, AppStore } from '../../../common/AppStore'


interface IncomeSelectorState {
    incomeTypes: Array<string>
    incomeType: string
}

const INITIAL_STATE: IncomeSelectorState = {
    incomeTypes: Array<string>(),
    incomeType: ''
}

const CHANGE_INCOME_TYPES = 'change_income_types'
const CHANGE_INCOME_TYPE = 'change_income_type'

function incomeSelectorStateReducer(state: IncomeSelectorState, action: AnyAction): IncomeSelectorState {
    switch (action.type) {
        case CHANGE_INCOME_TYPES:
            return {
                ...state,
                incomeTypes: action.payload
            }
        case CHANGE_INCOME_TYPE:
            return {
                ...state,
                incomeType: action.payload
            }
        default:
            return state
    }
}

export default function IncomeSelector() {
    const stateSelector = (store: AppStore) => store.forecaster.incomeType
    const defaultValueSelector = (values: Array<string>) => values[0]

    return <OptionSelector<string, string>
        className=''
        fetchDataSourceValues={fetchIncomeTypes}
        stateSelector={stateSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeIncomeType}
        label='Income type' />
}
