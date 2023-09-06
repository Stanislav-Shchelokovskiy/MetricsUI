import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { GroupBy } from '../../common/components/multiset_container/graph/GroupBySelector'

export async function fetchGroupBys(): Promise<FetchResult<Array<GroupBy>>> {
    return await fetchArray(`${PERFORMANCE_METRICS_END_POINT}/GroupBys`)
}
