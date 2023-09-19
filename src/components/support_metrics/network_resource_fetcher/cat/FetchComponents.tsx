import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../../common/store/multiset_container/sets/Interfaces'

export interface Component {
    component_id: string
    component_name: string
}

export async function fetchComponents(tents: FilterParametersNode<string>): Promise<FetchResult<Array<Component>>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/CATComponents`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tents: tents,
            })
        }
    )
}
