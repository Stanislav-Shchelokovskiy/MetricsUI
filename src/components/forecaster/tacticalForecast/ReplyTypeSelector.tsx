import React, {useRef} from 'react'
import OptionSelector from '../../common/components/OptionSelector'
import { AppStore } from '../../common/AppStore'
import { changeReplyType } from '../store/Actions'
import { fetchReplyTypes } from '../network_resource_fetcher/FetchForecastSettingsValues'



export default function ReplyTypeSelector({ tribeId }: { tribeId: string }) {
    const stateSelector = (store: AppStore) => store.tacticalForecast.find(x => x.tribeId === tribeId)?.replyType
    const defaultValueSelector = (values: Array<string>) => values[0]
    const onValueChange = (value: string) => changeReplyType(tribeId, value)

    return <OptionSelector<string, string>
        className=''
        fetchDataSourceValues={fetchReplyTypes}
        stateSelector={stateSelector}
        defaultValueSelector={defaultValueSelector}
        onValueChange={onValueChange}
        label='Forecast Mode'
        container='#tribe_accordion' />
}
