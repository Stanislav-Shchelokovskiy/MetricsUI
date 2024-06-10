import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface Severity {
    id: string
    name: string
}

export async function fetchSeverityValues(): Promise<FetchResult<Array<Severity>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/SeverityValues`)
}
