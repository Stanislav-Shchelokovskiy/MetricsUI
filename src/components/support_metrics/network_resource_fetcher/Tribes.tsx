import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult, { Knot } from '../../common/Typing'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export async function fetchTribes(): Promise<FetchResult<Array<Knot>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Tribes`)
}
