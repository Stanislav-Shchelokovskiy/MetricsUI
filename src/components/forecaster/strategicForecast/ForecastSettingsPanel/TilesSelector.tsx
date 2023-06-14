import React from 'react'
import OptionSelector from '../../../common/components/OptionSelector'
import { ForecasterStore } from '../../store/Store'
import { fetchTiles } from '../../network_resource_fetcher/FetchForecastSettingsValues'
import { changeTile } from '../../store/Actions'


export default function TilesSelector({ tentId }: { tentId: string }) {
    const valueSelector = (store: ForecasterStore) => store.strategicForecast.find(x => x.tentId === tentId)?.tile
    const defaultValueSelector = (values: Array<number>) => values[values.length % 2]
    const onValueChange = (value: number | undefined) => changeTile(tentId, value)

    return <OptionSelector<number, number>
        className=''
        fetchDataSource={fetchTiles}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Performance Level'
        container='#tribe_accordion' />
}
