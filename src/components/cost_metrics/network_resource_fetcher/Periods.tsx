import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { BaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'

export async function fetchPeriods(containerState: BaseContainerState, signal: AbortSignal): Promise<FetchResult<Array<string>>> {
    const [rangeStart, rangeEnd] = containerState.range
    if (anyValueIsEmpty(containerState.groupBy, rangeStart, rangeEnd))
        return {
            success: true,
            data: Array<string>()
        }
    return fetchArray(
        `${COST_METRICS_END_POINT}/PeriodsArray?` +
        `start=${rangeStart}` +
        `&end=${rangeEnd}` +
        `&format=${containerState.groupBy}`,
        { signal },
    )
}
