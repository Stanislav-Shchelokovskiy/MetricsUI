import React from 'react'
import OptionSelectorWithFetch from '../../../common/components/OptionSelector'
import { ForecasterStore } from '../../store/Store'
import { changeForecastHorizon } from '../../store/Actions'
import { fetchForecastHorizons } from '../../network_resource_fetcher/FetchForecastSettingsValues'


export default function ForecastHorizonSelector({ tribeId, }: { tribeId: string }) {
    const stateSelector = (store: ForecasterStore) => store.strategicForecast.find(x => x.tribeId === tribeId)?.forecastHorizon
    const defaultValueSelector = (values: Array<string>) => values[0]
    const onValueChange = (value: string) => changeForecastHorizon(tribeId, value)

    return <OptionSelectorWithFetch<string, string>
        className=''
        fetchDataSourceValues={fetchForecastHorizons}
        stateSelector={stateSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Forecast Horizon'
        container='#tribe_accordion' />
}
