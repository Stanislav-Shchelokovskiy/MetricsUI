import React from 'react'
import OptionSelectorWithFetch from '../../common/components/OptionSelector'
import { ForecasterStore } from '../store/Store'
import { changeReplyType } from '../store/Actions'
import { fetchReplyTypes } from '../network_resource_fetcher/FetchForecastSettingsValues'



export default function ReplyTypeSelector({ tribeId }: { tribeId: string }) {
    const stateSelector = (store: ForecasterStore) => store.tacticalForecast.find(x => x.tribeId === tribeId)?.replyType
    const defaultValueSelector = (values: Array<string>) => values[0]
    const onValueChange = (value: string) => changeReplyType(tribeId, value)

    return <OptionSelectorWithFetch<string, string>
        className=''
        fetchDataSourceValues={fetchReplyTypes}
        stateSelector={stateSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Forecast Mode'
        container='#tribe_accordion' />
}
