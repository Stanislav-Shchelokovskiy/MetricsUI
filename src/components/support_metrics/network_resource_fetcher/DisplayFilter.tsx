import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Typing'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { SetState } from '../store/sets/Interfaces'
import { getAliasedSet } from '../store/sets/SetDescriptor'

export type DisplayFilter = Array<any>

export async function fetchDisplayFilter(
    metric: string,
    set: SetState,
): Promise<FetchResult<DisplayFilter>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/DisplayFilter`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set),
                Percentile: { metric: metric, value: set.percentile }
            }),
        }
    )
}
