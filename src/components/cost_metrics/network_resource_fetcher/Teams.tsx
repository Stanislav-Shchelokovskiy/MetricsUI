import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export interface Team {
    name: string
}

export async function fetchTeams(): Promise<FetchResult<Array<Team>>> {
    return fetchArray(`${COST_METRICS_END_POINT}/CostMetrics/Teams`)
}
