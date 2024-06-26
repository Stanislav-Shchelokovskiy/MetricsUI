import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface EmpTribe {
    id: string
    name: string
}

export async function fetchEmpTribes(): Promise<FetchResult<Array<EmpTribe>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/EmpTribes`)
}
