import React from 'react'
import OptionSelector from '../../../common/components/OptionSelector'
import { ForecasterStore } from '../../store/Store'
import { changeForecastHorizon } from '../../store/Actions'
import { fetchForecastHorizons } from '../../network_resource_fetcher/FetchForecastSettingsValues'


export default function ForecastHorizonSelector({ tentId }: { tentId: string }) {
    const valueSelector = (store: ForecasterStore) => store.strategicForecast.find(x => x.tentId === tentId)?.forecastHorizon
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
