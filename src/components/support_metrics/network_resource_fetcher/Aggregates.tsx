import { SUPPORT_METRICS_END_POINT } from '../../common/EndPoint'
import FetchResult from '../../common/Typing'
import { fetchConvert } from '../../common/network_resource_fetcher/FetchOrDefault'
import { ContainerState } from '../store/ContainerReducer'
import { SetState } from '../store/sets/Interfaces'
import { BaseContainerState } from '../../common/store/multiset_container/BaseContainerState'
import { BaseSetState } from '../../common/store/multiset_container/sets/Interfaces'
import { getAliasedSet } from '../store/sets/SetDescriptor'
import { Agg } from '../../common/components/multiset_container/graph/ComparisonGraph'
import { anyValueIsEmpty } from '../../common/store/multiset_container/Utils'
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
                name: '',
                ...EMPTY_AGGREGATES,
            }
        }

    return fetchConvert(getAggregatesConverter(set.title),
        `${SUPPORT_METRICS_END_POINT}/TicketsWithIterationsAggregates?` +
        `group_by_period=${containerState.groupBy}` +
        `&range_start=${rangeStart}` +
        `&range_end=${rangeEnd}` +
        `&baseline_aligned_mode_enabled=${(containerState as ContainerState).baselineAlignedModeEnabled}` +
        `&metric=${containerState.metric}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...getAliasedSet(set as SetState),
                Percentile: { metric: containerState.metric, value: (set as SetState).percentile }
            }),
            signal: signal,
        })
}
