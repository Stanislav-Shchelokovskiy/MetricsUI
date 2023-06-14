import React from 'react'
import OptionSelector from '../../../common/components/OptionSelector'
import { ForecasterStore } from '../../store/Store'
import { fetchTiles } from '../../network_resource_fetcher/ForecastSettingsValues'
import { changeTile } from '../../store/strategic_forecast/Actions'
import { useTentId } from '../../tent/TentContext'
import { tileSelector } from '../../store/strategic_forecast/Selectors'


export default function TilesSelector() {
    const tentId = useTentId()
    const valueSelector = (store: ForecasterStore) => tileSelector(store, tentId)
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
