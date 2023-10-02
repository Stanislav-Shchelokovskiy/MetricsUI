import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'
import { StringFilterParameters } from '../../../common/store/multiset_container/sets/Interfaces'

export interface Platform {
    platform_id: string
    platform_name: string
}

export async function fetchPlatforms(tents: StringFilterParameters): Promise<FetchResult<Array<Platform>>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/Platforms`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tents: tents, }),
        }
    )
}
