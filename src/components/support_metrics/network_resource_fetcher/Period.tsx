import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Typing'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { Period, converter } from '../../common/network_resource_fetcher/converters/Period'

export async function fetchPeriod(): Promise<FetchResult<Period>> {
    return fetchConvert(converter, `${SUPPORT_METRICS_END_POINT}/TicketsWithIterationsPeriod`)
}
