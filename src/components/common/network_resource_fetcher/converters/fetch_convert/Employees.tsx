import { SUPPORT_METRICS_END_POINT } from '../../../EndPoint'
import FetchResult from '../../../Typing'
import { fetchArray } from '../../../network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../../store/multiset_container/sets/Interfaces'

export async function crmidsToSCIDS(crmids: FilterParametersNode<string>): Promise<FetchResult<FilterParametersNode<string>>> {
    return {
        success: true,
        data: {
            ...crmids,
            values: crmids.values.map(x => x)
        }

    }
}
