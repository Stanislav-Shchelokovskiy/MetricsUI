import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { GroupByPeriod } from '../../common/components/multiset_container/graph/GroupByPeriodSelector'

function convert(values: Array<GroupByPeriod> | undefined): Array<GroupByPeriod> {
    return values ? values.slice(2) : Array<GroupByPeriod>()
}
export async function fetchGroupByPeriods(): Promise<FetchResult<Array<GroupByPeriod>>> {
    return await fetchConvert(convert, `${COST_METRICS_END_POINT}/GroupByPeriods`)
}
