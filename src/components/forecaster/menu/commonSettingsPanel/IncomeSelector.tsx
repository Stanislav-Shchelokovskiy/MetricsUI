import React from 'react'
import OptionSelector from '../../../common/components/OptionSelector'
import { fetchIncomeTypes } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeIncomeType } from '../../store/Actions'
import { ForecasterStore } from '../../store/Store'


export default function IncomeSelector() {
    const valueSelector = (store: ForecasterStore) => store.forecaster.incomeType
    const defaultValueSelector = (values: Array<string>) => values[0]

    return <OptionSelector<string, string>
        className=''
        fetchDataSource={fetchIncomeTypes}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeIncomeType}
        label='Income type' />
}
