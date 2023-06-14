import React from 'react'
import OptionSelector from '../../../common/components/OptionSelector'
import { fetchIncomeTypes } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeIncomeType } from '../../store/forecaster/Actions'
import { incomeTypeSelector } from '../../store/forecaster/Selectors'


export default function IncomeSelector() {
    const defaultValueSelector = (values: Array<string>) => values[0]

    return <OptionSelector<string, string>
        className=''
        fetchDataSource={fetchIncomeTypes}
        valueSelector={incomeTypeSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={changeIncomeType}
        label='Income type' />
}
