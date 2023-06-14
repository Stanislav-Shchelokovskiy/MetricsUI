import React from 'react'
import OptionSelector from '../../../common/components/OptionSelector'
import { ForecasterStore } from '../../store/Store'
import { changeForecastHorizon } from '../../store/strategic_forecast/Actions'
import { fetchForecastHorizons } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { useTentId } from '../../tent/TentContext'
import { forecastHorizonSelector } from '../../store/strategic_forecast/Selectors'


export default function ForecastHorizonSelector() {
    const tentId = useTentId()
    const valueSelector = (store: ForecasterStore) => forecastHorizonSelector(store, tentId)
    const defaultValueSelector = (values: Array<string>) => values[0]
    const onValueChange = (value: string | undefined) => changeForecastHorizon(tentId, value)

    return <OptionSelector<string, string>
        className=''
        fetchDataSource={fetchForecastHorizons}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Forecast Horizon'
        container='#tribe_accordion' />
}
