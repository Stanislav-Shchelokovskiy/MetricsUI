import React from 'react'
import OptionSelectorWithFetch from '../../../common/components/OptionSelector'
import { fetchIncomeTypes } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeIncomeType } from '../../store/Actions'
import { ForecasterStore } from '../../store/Store'


export default function IncomeSelector() {
    const stateSelector = (store: ForecasterStore) => store.forecaster.incomeType
    const defaultValueSelector = (values: Array<string>) => values[0]

    return <OptionSelectorWithFetch<string, string>
        className=''
        fetchDataSourceValues={fetchIncomeTypes}
        stateSelector={stateSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeIncomeType}
        label='Income type' />
}
