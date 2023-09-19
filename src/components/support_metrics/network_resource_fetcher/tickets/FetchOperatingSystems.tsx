import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface OS {
    id: string
    name: string
}

export async function fetchOperatingSystems(): Promise<FetchResult<Array<OS>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/OperatingSystems`)
}
