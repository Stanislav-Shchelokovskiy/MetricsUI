import React, { useReducer, useEffect } from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import SelectBox, { DropDownOptions } from 'devextreme-react/select-box'
import LoadIndicator from '../../utils/LoadIndicator'
import FetchResult from '../../network_resource_fetcher/FetchResult'
import { fetchIncomeTypes } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeIncomeType } from '../../store/Actions'
import { useForecasterDispatch, useForecasterSelector, ForecasterStore } from '../../store/ForecasterStore'


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
    const [incomeSelectorState, incomeSelectorDispatch] = useReducer(incomeSelectorStateReducer, INITIAL_STATE)
    const incomeType = useForecasterSelector((store: ForecasterStore) => store.forecaster.incomeType) || incomeSelectorState.incomeType


    const forecasterDispatch = useForecasterDispatch()
    const onIncomeTypeChange: (incomeType: string) => void = (incomeType: string) => {
        forecasterDispatch(changeIncomeType(incomeType))
    }

    useEffect(() => {
        (async () => {
            const fetchResult: FetchResult<Array<string>> = await fetchIncomeTypes()
            if (fetchResult.success) {
                incomeSelectorDispatch({ type: CHANGE_INCOME_TYPES, payload: fetchResult.data })
                const defaultIncomeType = fetchResult.data[0]
                incomeSelectorDispatch({ type: CHANGE_INCOME_TYPE, payload: defaultIncomeType })
                forecasterDispatch(changeIncomeType(defaultIncomeType))
            }
        })()
    }, [])

    if (incomeSelectorState.incomeTypes.length > 0) {
        return (
            <SelectBox
                dataSource={incomeSelectorState.incomeTypes}
                defaultValue={incomeType}
                onValueChange={onIncomeTypeChange}
                label='Income type'
                labelMode='static'>
                <DropDownOptions
                    hideOnOutsideClick={true}
                    hideOnParentScroll={true} />
            </SelectBox >
        )
    }
    return <LoadIndicator width={undefined} height={25} />
}
