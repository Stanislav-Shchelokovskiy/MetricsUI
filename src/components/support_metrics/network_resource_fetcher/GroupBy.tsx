import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Typing'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { GroupBy } from '../../common/components/multiset_container/graph/GroupBySelector'

export async function fetchGroupBys(): Promise<FetchResult<Array<GroupBy>>> {
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/GroupByPeriods`)
}
