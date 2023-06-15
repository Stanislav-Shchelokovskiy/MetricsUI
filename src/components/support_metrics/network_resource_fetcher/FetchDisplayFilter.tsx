import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { SetState } from '../store/sets_reducer/Interfaces'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'

export type DisplayFilter = Array<any>

export async function fetchDisplayFilter(
    metric: string,
    set: SetState,
): Promise<FetchResult<DisplayFilter>> {
    return fetchArray(
        `${SUPPORT_ANALYTICS_END_POINT}/DisplayFilter`,
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
