import React from 'react'
import OptionSelectorWithFetch from '../../../common/components/OptionSelector'
import { AppStore } from '../../../common/AppStore'
import { fetchTiles } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeTile } from '../../store/Actions'


export default function TilesSelector({ tribeId, }: { tribeId: string }) {
    const stateSelector = (store: AppStore) => store.strategicForecast.find(x => x.tribeId === tribeId)?.tile
    const defaultValueSelector = (values: Array<number>) => values[values.length % 2]
    const onValueChange = (value: number) => changeTile(tribeId, value)

    return <OptionSelectorWithFetch<number, number>
        className=''
        fetchDataSourceValues={fetchTiles}
        stateSelector={stateSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Performance Level'
        container='#tribe_accordion' />
}
