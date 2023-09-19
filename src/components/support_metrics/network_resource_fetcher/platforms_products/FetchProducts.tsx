import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../../common/store/multiset_container/sets/Interfaces'

export interface Product {
    product_id: string
    pproduct_name: string
}

export async function fetchProducts(tents: FilterParametersNode<string>): Promise<FetchResult<Array<Product>>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/Products`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tents: tents }),
        }
    )
}
