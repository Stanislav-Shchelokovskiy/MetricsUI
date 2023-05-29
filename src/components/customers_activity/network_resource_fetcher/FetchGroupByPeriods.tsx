import { SUPPORT_ANALYTICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export interface GroupByPeriod {
    name: string
    format: string
}

export async function fetchGroupByPeriods(): Promise<FetchResult<Array<GroupByPeriod>>> {
    return fetchArray(`${SUPPORT_ANALYTICS_END_POINT}/GroupByPeriods`)
}
