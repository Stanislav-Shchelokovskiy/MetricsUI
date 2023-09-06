import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { GroupBy } from '../../common/components/multiset_container/graph/GroupBySelector'

function convert(values: Array<GroupBy> | undefined): Array<GroupBy> {
    return values ? values.slice(2) : Array<GroupBy>()
}
export async function fetchGroupBys(): Promise<FetchResult<Array<GroupBy>>> {
    return await fetchConvert(convert, `${COST_METRICS_END_POINT}/GroupByPeriods`)
}
