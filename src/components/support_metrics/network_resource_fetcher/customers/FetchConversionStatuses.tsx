import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'
import { FilterParametersNode } from '../../../common/store/multiset_container/sets/Interfaces'
import { allNodesAreConsideredEmpty } from '../../../common/store/multiset_container/Utils'

export interface ConversionStatus {
    id: number
    name: string
}

export async function fetchConversionStatuses(licenseStatuses: FilterParametersNode<number>): Promise<FetchResult<Array<ConversionStatus>>> {
    if (allNodesAreConsideredEmpty(licenseStatuses))
        return {
            success: true,
            data: Array<ConversionStatus>()
        }

    return fetchArray(
        `${SUPPORT_METRICS_END_POINT}/ConversionStatuses`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                license_statuses: licenseStatuses,
            }),
        }
    )
}
