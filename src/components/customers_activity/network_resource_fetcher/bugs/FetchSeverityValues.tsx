import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface Severity {
    id: string
    name: string
}

export async function fetchSeverityValues(): Promise<FetchResult<Array<Severity>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/get_severity_values`)
}
