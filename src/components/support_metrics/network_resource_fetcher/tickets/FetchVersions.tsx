import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface Version {
    id: string
    name: string
}

export async function fetchVersions(): Promise<FetchResult<Array<Version>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Builds`)
}
