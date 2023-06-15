import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface Version {
    id: string
    name: string
}

export async function fetchVersions(): Promise<FetchResult<Array<Version>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/Builds`)
}
