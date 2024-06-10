import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'
import { StringFilterParameters } from '../../../common/store/multiset_container/sets/Interfaces'

export interface Feature {
    feature_id: string
    feature_name: string
}

export async function fetchFeatures(
    tents: StringFilterParameters,
    components: StringFilterParameters
): Promise<FetchResult<Array<Feature>>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/CATFeatures`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tents: tents,
                components: components,
            }),
        }
    )
}
