import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface EmpTent {
    id: string
    name: string
}

export async function fetchEmpTents(): Promise<FetchResult<Array<EmpTent>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/get_emp_tents`)
}
