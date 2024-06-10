import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult, { Knot } from '../../common/Typing'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export async function fetchPositions(): Promise<FetchResult<Array<Knot>>> {
    return fetchArray(`${PERFORMANCE_METRICS_END_POINT}/Positions`)
}
