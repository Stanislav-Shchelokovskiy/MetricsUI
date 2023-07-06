import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export interface Position {
    name: string
}

export async function fetchPositions(): Promise<FetchResult<Array<Position>>> {
    return fetchArray(`${COST_METRICS_END_POINT}/CostMetrics/Positions`)
}
