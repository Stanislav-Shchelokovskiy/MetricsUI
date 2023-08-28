import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult, { Knot } from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export async function fetchTents(): Promise<FetchResult<Array<Knot>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/Tents`)
}
