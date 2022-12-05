import React from 'react'
import OptionSelector from '../../../common/components/OptionSelector'
import { fetchIncomeTypes } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeIncomeType } from '../../store/Actions'
import { AppStore } from '../../../common/AppStore'


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
