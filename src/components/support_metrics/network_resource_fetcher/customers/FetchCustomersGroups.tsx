import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface CustomersGroup {
    id: string
    name: string
}

export async function fetchCustomersGroups(baseLineAligned: boolean): Promise<FetchResult<Array<CustomersGroup>>> {
    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/CustomersGroups?` + new URLSearchParams({
            tracked: baseLineAligned.toString()
        })
    )
}
