import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface Framework {
    id: string
    name: string
}

export async function FetchFrameworks(): Promise<FetchResult<Array<Framework>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/Frameworks`)
}
