import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface OS {
    id: string
    name: string
}

export async function fetchOperatingSystems(): Promise<FetchResult<Array<OS>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/OperatingSystems`)
}
