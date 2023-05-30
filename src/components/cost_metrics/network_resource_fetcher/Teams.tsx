import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export interface Team {
    id: number
    name: string
}

export async function fetchTeams(): Promise<FetchResult<Array<Team>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/CostMetrics/Teams`)
}
