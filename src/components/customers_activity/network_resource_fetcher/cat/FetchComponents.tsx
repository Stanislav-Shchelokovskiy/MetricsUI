import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../../common/store/multiset_container/sets/Interfaces'

export interface Component {
    component_id: string
    component_name: string
}

export async function fetchComponents(tents: FilterParametersNode<string>): Promise<FetchResult<Array<Component>>> {
    return fetchArray(
        `${SUPPORT_ANALYTICS_END_POINT}/get_components`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tents: tents,
            })
        }
    )
}
