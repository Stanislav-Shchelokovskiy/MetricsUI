import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Period, converter } from '../../common/network_resource_fetcher/converters/Period'

export async function fetchPeriod(): Promise<FetchResult<Period>> {
    return fetchConvert(converter, `${PERFORMANCE_METRICS_END_POINT}/Period`)
}
