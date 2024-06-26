import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface EmpTent {
    id: string
    name: string
}

export async function fetchEmpTents(): Promise<FetchResult<Array<EmpTent>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/EmpTents`)
}
