import React from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { ForecasterStore } from '../store/Store'
import { changeReplyType } from '../store/Actions'
import { fetchReplyTypes } from '../network_resource_fetcher/FetchForecastSettingsValues'



export default function ReplyTypeSelector({ tentId }: { tentId: string }) {
    const valueSelector = (store: ForecasterStore) => store.tacticalForecast.find(x => x.tentId === tentId)?.replyType
    const defaultValueSelector = (values: Array<string>) => values[0]
    const onValueChange = (value: string | undefined) => changeReplyType(tentId, value)

    return <OptionSelector<string, string>
        className='ForecasterReplyTypeSelector'
        fetchDataSource={fetchReplyTypes}
        valueSelector={valueSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Forecast Mode'
        container='#tribe_accordion' />
}
