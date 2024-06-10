import { SUPPORT_METRICS_END_POINT } from '../../../common/EndPoint'
import FetchResult from '../../../common/Typing'
import { fetchArray } from '../../../common/network_resource_fetcher/FetchOrDefault'

export interface Role {
    id: string
    name: string
}

export async function fetchRoles(): Promise<FetchResult<Array<Role>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Roles`)
}
