import FetchResult from '../../common/Typing'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { COST_METRICS_END_POINT } from '../../common/EndPoint'
import { SetState } from '../store/sets/Interfaces'
import { getAliasedSet } from '../store/sets/SetDescriptor'
import { Agg } from '../../common/components/multiset_container/graph/ComparisonGraph'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'
import { BaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { BaseSetState } from '../../common/store/multiset_container/sets/Interfaces'
import { EMPTY_AGGREGATES, getAggregatesConverter } from '../../common/network_resource_fetcher/converters/Aggregate'


export async function fetchAggregates(
    containerState: BaseContainerState,
    set: BaseSetState,
    signal: AbortSignal,
): Promise<FetchResult<Agg>> {
    const [rangeStart, rangeEnd] = containerState.range

    if (anyValueIsEmpty(rangeStart, rangeEnd, containerState.groupBy, containerState.metric))
        return {
            success: false,
            data: {
                name: set.title,
                ...EMPTY_AGGREGATES
            }
        }

    return fetchConvert(getAggregatesConverter(set.title),
        `${COST_METRICS_END_POINT}/CostMetrics/Aggregates?` +
        `group_by_period=${containerState.groupBy}` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}` +
        `&metric=${containerState.metric}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set as SetState),
            }),
            signal: signal,
        },
    )
}
