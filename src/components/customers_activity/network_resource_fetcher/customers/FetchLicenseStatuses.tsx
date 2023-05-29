import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface LicenseStatus {
    id: number
    name: string
}

export async function fetchLicenseStatuses(): Promise<FetchResult<Array<LicenseStatus>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/LicenseStatuses`)
}
