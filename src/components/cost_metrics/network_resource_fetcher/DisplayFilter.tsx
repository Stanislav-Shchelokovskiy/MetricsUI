import FetchResult from '../../common/Typing'
import { SetState } from '../store/sets/Interfaces'
import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { getAliasedSet } from '../store/sets/SetDescriptor'


export async function fetchDisplayFilter(metric: string, set: SetState): Promise<FetchResult<Array<any>>> {
    return fetchArray(
        `${COST_METRICS_END_POINT}/DisplayFilter`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set),
            }),
        }
    )
}
