import React from 'react'
import OptionSelector from '../../../common/components/OptionSelector'
import { AppStore } from '../../../common/AppStore'
import { changeForecastHorizon } from '../../store/Actions'
import { fetchForecastHorizons } from '../../network_resource_fetcher/FetchForecastSettingsValues'


export default function ForecastHorizonSelector({ tribeId, }: { tribeId: string }) {
    const stateSelector = (store: AppStore) => store.strategicForecast.find(x => x.tribeId === tribeId)?.forecastHorizon
    const defaultValueSelector = (values: Array<string>) => values[0]
    const onValueChange = (value: string) => changeForecastHorizon(tribeId, value)

    return <OptionSelector<string, string>
        className=''
        fetchDataSourceValues={fetchForecastHorizons}
        stateSelector={stateSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Forecast Horizon'
        container='#tribe_accordion' />
}
