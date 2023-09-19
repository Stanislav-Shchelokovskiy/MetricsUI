import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface LicenseStatus {
    id: number
    name: string
}

export async function fetchLicenseStatuses(): Promise<FetchResult<Array<LicenseStatus>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/LicenseStatuses`)
}
