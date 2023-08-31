import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { GroupByPeriod } from '../../common/components/multiset_container/graph/GroupByPeriodSelector'

export async function fetchGroupByPeriods(): Promise<FetchResult<Array<GroupByPeriod>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/GroupByPeriods`)
}
