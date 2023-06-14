import React from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { ForecasterStore } from '../store/Store'
import { changeReplyType } from '../store/tactical_forecast/Actions'
import { fetchReplyTypes } from '../network_resource_fetcher/FetchForecastSettingsValues'
import { useTentId } from '../tent/TentContext'
import { replyTypeSelector } from '../store/tactical_forecast/Selectors'


export default function ReplyTypeSelector() {
    const tentId = useTentId()
    const valueSelector = (store: ForecasterStore) => replyTypeSelector(store, tentId)
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
