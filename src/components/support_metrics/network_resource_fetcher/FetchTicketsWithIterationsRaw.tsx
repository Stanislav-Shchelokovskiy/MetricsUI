import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { SetState } from '../store/sets/Interfaces'
import { getAliasedSet } from '../store/sets/SetDescriptor'
import { ContainerState } from '../store/ContainerReducer'

export interface TicketsWithIterationsRaw {
    user_id: string
    tribe_id: string
    scid: string
    ticket_type: number
    creation_date: string
    iterations: number
    reply: string
    component: string
    feature: string
}

export async function fetchTicketsWithIterationsRaw(
    containerState: ContainerState,
    set: SetState,
): Promise<FetchResult<Array<TicketsWithIterationsRaw>>> {
    const [rangeStart, rangeEnd] = containerState.range
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/TicketsWithIterationsRaw?` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}` +
        `&baseline_aligned_mode_enabled=${containerState.baselineAlignedModeEnabled}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set),
                Percentile: { metric: containerState.metric, value: set.percentile }
            }),
        })
}