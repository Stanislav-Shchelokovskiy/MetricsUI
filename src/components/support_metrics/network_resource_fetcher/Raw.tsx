import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Typing'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { SetState } from '../store/sets/Interfaces'
import { getAliasedSet } from '../store/sets/SetDescriptor'
import { ContainerState } from '../store/ContainerReducer'
import { toDate } from '../../common/DatePeriodUtils'
import { booleanSetting } from '../../common/Typing'

export interface RawData {
    creation_date: any
    subscription_start: any
    expiration_date: any
    fixed_on: any
    closed_on: any
    converted_to_bug_on: any
    [index: string]: any
}

export async function fetchTicketsWithIterationsRaw(
    containerState: ContainerState,
    set: SetState,
): Promise<FetchResult<Array<RawData>>> {
    const [rangeStart, rangeEnd] = containerState.range
    return fetchConvert(converter, `${SUPPORT_METRICS_END_POINT}/TicketsWithIterationsRaw?` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}` +
        `&baseline_aligned_mode_enabled=${booleanSetting(containerState.baselineAlignedModeEnabled)}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set),
                Percentile: { metric: containerState.metric, value: set.percentile }
            }),
        })
}

function converter(values: Array<RawData> | undefined): Array<RawData> {
    return values ? values.map(r => {
        r.creation_date = toDate(r.creation_date)
        r.subscription_start = toDate(r.subscription_start)
        r.expiration_date = toDate(r.expiration_date)
        r.fixed_on = toDate(r.fixed_on)
        r.closed_on = toDate(r.closed_on)
        r.converted_to_bug_on = toDate(r.converted_to_bug_on)
        return r
    }) : Array<RawData>()
}
