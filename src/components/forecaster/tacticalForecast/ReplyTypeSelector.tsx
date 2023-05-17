import React from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { ForecasterStore } from '../store/Store'
import { changeReplyType } from '../store/Actions'
import { fetchReplyTypes } from '../network_resource_fetcher/FetchForecastSettingsValues'



export default function ReplyTypeSelector({ tribeId }: { tribeId: string }) {
    const valueSelector = (store: ForecasterStore) => store.tacticalForecast.find(x => x.tribeId === tribeId)?.replyType
    const defaultValueSelector = (values: Array<string>) => values[0]
    const onValueChange = (value: string | undefined) => changeReplyType(tribeId, value)

    return <OptionSelector<string, string>
        className='ForecasterReplyTypeSelector'
        fetchDataSource={fetchReplyTypes}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Forecast Mode'
        container='#tribe_accordion' />
}
