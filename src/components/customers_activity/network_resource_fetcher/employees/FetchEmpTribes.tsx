import { SUPPORT_ANALYTICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Interfaces'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface EmpTribe {
    id: string
    name: string
}

export async function fetchEmpTribes(): Promise<FetchResult<Array<EmpTribe>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/get_emp_tribes`)
}
