import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets_reducer/SetsReducer'
import { getAliasedSet } from '../store/sets_reducer/SetDescriptor'
import FetchResult from '../../common/Interfaces'
import { fetchArray } from '../../common/network_resource_fetcher/FetchOrDefault'

export async function fetchCostMetricsRaw(
    containerState: ContainerState,
    set: SetState,
): Promise<FetchResult<Array<any>>> {
    const [rangeStart, rangeEnd] = containerState.range
    return fetchArray(`${SUPPORT_METRICS_END_POINT}/CostMetrics/Raw?` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set),
            }),
        })
}
