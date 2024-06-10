import { PERFORMANCE_METRICS_END_POINT } from '../../common/EndPoint'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'
import { BaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import FetchResult from '../../common/Typing'


export async function fetchPeriods(containerState: BaseContainerState, signal: AbortSignal): Promise<FetchResult<Array<string>>> {
    const [rangeStart, rangeEnd] = containerState.range
    if (anyValueIsEmpty(containerState.groupBy, rangeStart, rangeEnd))
        return {
            success: true,
            data: []
        }
    return fetchArray(`${PERFORMANCE_METRICS_END_POINT}/PeriodsArray?` +
        `start=${rangeStart}` +
        `&end=${rangeEnd}` +
        `&format=${containerState.groupBy}`,
        { signal },
    )
}
